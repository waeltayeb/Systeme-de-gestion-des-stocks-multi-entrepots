package Taieb.wael.stock_management.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String motDePasse;
    private  String nom;
}
