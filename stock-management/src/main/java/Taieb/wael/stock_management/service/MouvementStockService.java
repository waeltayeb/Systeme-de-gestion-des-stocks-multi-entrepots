package Taieb.wael.stock_management.service;

import Taieb.wael.stock_management.dto.MouvementStockDTO;
import Taieb.wael.stock_management.dto.MouvementStockResponseDTO;
import Taieb.wael.stock_management.exception.StockInsuffisantException;
import Taieb.wael.stock_management.entity.*;
import Taieb.wael.stock_management.repository.*;
import lombok.extern.slf4j.Slf4j; // Ajout
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j // Ajout
public class MouvementStockService {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private EntrepotRepository entrepotRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private MouvementStockRepository mouvementStockRepository;

    public List<MouvementStockResponseDTO> getAllMouvements() {
        return mouvementStockRepository.findAll().stream().map(m -> {
            MouvementStockResponseDTO dto = new MouvementStockResponseDTO();
            dto.setId(m.getId());
            dto.setProduitNom(m.getProduit().getNom());
            dto.setEntrepotNom(m.getEntrepot().getNom());
            dto.setType(m.getType().name());
            dto.setQuantite(m.getQuantite());
            dto.setDate(m.getDate());
            return dto;
        }).toList();
    }


    public Optional<MouvementStock> getMouvementById(Long id) {
        return mouvementStockRepository.findById(id);
    }

    public void createMouvementStock(MouvementStockDTO dto) {
        log.info("ID Entrepôt reçu : {}", dto.getEntrepotId());

        Produit produit = produitRepository.findById(dto.getProduitId())
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        Entrepot entrepot = entrepotRepository.findById(dto.getEntrepotId())
                .orElseThrow(() -> new RuntimeException("Entrepôt introuvable"));

        TypeMouvement type = TypeMouvement.valueOf(dto.getType().toUpperCase());
        int quantite = dto.getQuantite();



        // 🔁 Mettre à jour ou créer le stock
        Stock stock = stockRepository.findByProduitIdAndEntrepotId(
                produit.getId(), entrepot.getId()
        ).orElseGet(() -> {
            Stock s = new Stock();
            s.setProduit(produit);
            s.setEntrepot(entrepot);
            s.setQuantite(0); // valeur initiale
            s.setSeuilAlerte(produit.getSeuilMin());
            return s;
        });

        // ➕➖ Mettre à jour la quantité
        if (type == TypeMouvement.ENTREE) {
            stock.setQuantite(stock.getQuantite() + quantite);
            // 📦 Créer le mouvement de stock
            MouvementStock mouvement = new MouvementStock();
            mouvement.setProduit(produit);
            mouvement.setEntrepot(entrepot);
            mouvement.setQuantite(quantite);
            mouvement.setType(type);
            mouvement.setDate(LocalDate.now());

            mouvementStockRepository.save(mouvement);
        } else if (type == TypeMouvement.SORTIE) {
            if (stock.getQuantite() < quantite) {
                throw new StockInsuffisantException("Quantité demandée supérieure au stock disponible.");
            }
            // 📦 Créer le mouvement de stock
            MouvementStock mouvement = new MouvementStock();
            mouvement.setProduit(produit);
            mouvement.setEntrepot(entrepot);
            mouvement.setQuantite(quantite);
            mouvement.setType(type);
            mouvement.setDate(LocalDate.now());

            mouvementStockRepository.save(mouvement);
            stock.setQuantite(stock.getQuantite() - quantite);
        }

        stockRepository.save(stock);

        // 🔔 Alerte si stock bas
        if (stock.getQuantite() < stock.getSeuilAlerte()) {
            log.warn("⚠️ Stock bas pour le produit '{}', entrepôt '{}'", produit.getNom(), entrepot.getNom());
        }
    }

    public void deleteMouvement(Long id) {
        mouvementStockRepository.deleteById(id);
    }
}
