package Taieb.wael.stock_management.dto;

import Taieb.wael.stock_management.entity.Produit;
import lombok.Data;

@Data
public class ProduitDTO {
    private Long id;
    private String nom;
    private String categorie;
    private String fournisseur;
    private double prix;
    private int seuilMin;

    public ProduitDTO(Produit produit) {
        this.id = produit.getId();
        this.nom = produit.getNom();
        this.categorie = produit.getCategorie();
        this.fournisseur = produit.getFournisseur();
        this.prix = produit.getPrix();
        this.seuilMin = produit.getSeuilMin();
    }

    // Getters et Setters
}

