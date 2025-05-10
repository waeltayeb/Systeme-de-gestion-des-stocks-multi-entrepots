package Taieb.wael.stock_management.repository;

import Taieb.wael.stock_management.entity.Entrepot;
import Taieb.wael.stock_management.entity.Produit;
import Taieb.wael.stock_management.entity.Stock;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, Long> {

    // Optional<Stock> findByProduitAndEntrepot(Produit produit, Entrepot entrepot);
    Optional<Stock> findByProduitIdAndEntrepotId(Long produitId, Long entrepotId);

}
