package Taieb.wael.stock_management.repository;

import Taieb.wael.stock_management.entity.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    // Tu peux ajouter des méthodes personnalisées ici si besoin plus tard
}
