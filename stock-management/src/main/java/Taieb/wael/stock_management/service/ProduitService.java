package Taieb.wael.stock_management.service;

import Taieb.wael.stock_management.entity.Produit;
import Taieb.wael.stock_management.repository.ProduitRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    @Transactional
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    public Optional<Produit> getProduitById(Long id) {
        return produitRepository.findById(id);
    }

    public Produit createProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    public Produit updateProduit(Long id, Produit updatedProduit) {
        return produitRepository.findById(id)
                .map(produit -> {
                    produit.setNom(updatedProduit.getNom());
                    produit.setCategorie(updatedProduit.getCategorie());
                    produit.setPrix(updatedProduit.getPrix());
                    produit.setFournisseur(updatedProduit.getFournisseur());
                    produit.setSeuilMin(updatedProduit.getSeuilMin());
                    return produitRepository.save(produit);
                })
                .orElse(null);
    }

    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }
}
