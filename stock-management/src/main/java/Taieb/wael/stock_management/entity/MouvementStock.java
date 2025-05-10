package Taieb.wael.stock_management.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MouvementStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Produit produit;

    @ManyToOne
    private Entrepot entrepot;

    @Enumerated(EnumType.STRING)
    private TypeMouvement type; // ENTREE ou SORTIE

    private int quantite;

    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "stock_id")
    private Stock stock;


    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }
}
