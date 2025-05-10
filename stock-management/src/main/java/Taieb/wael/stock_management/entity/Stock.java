package Taieb.wael.stock_management.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Produit produit;

    @ManyToOne
    private Entrepot entrepot;

    private int quantite;

    private int seuilAlerte;

    // ✅ Constructeur personnalisé
    public Stock(Produit produit, Entrepot entrepot, int quantite, int seuilAlerte) {
        this.produit = produit;
        this.entrepot = entrepot;
        this.quantite = quantite;
        this.seuilAlerte = seuilAlerte;
    }
}
