package Taieb.wael.stock_management.dto;

import lombok.Getter;
import lombok.Setter;
import Taieb.wael.stock_management.entity.TypeMouvement;
import java.time.LocalDate;

@Getter
@Setter
public class MouvementStockDTO {
    private Long produitId;
    private Long entrepotId;
    private int quantite;
    private String type;

    // Getters et setters
    public Long getProduitId() {
        return produitId;
    }

    public void setProduitId(Long produitId) {
        this.produitId = produitId;
    }

    public Long getEntrepotId() {
        return entrepotId;
    }

    public void setEntrepotId(Long entrepotId) {
        this.entrepotId = entrepotId;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
