package Taieb.wael.stock_management.dto;

import lombok.Data;

@Data
public class StockResponse {
    private Long id;
    private int quantite;
    private String produitNom;
    private String entrepotNom;
    // ajoute d'autres champs pertinents ici si besoin
}
