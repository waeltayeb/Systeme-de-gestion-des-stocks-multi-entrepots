package Taieb.wael.stock_management.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class MouvementStockResponseDTO {
    private Long id;
    private String produitNom;
    private String entrepotNom;
    private String type;
    private int quantite;
    private LocalDate date;
}
