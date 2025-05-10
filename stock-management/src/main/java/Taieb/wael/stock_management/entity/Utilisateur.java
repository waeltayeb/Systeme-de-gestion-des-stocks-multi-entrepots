package Taieb.wael.stock_management.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Utilisateur")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    @Column(unique = true)
    private String email;

    private String motDePasse;

    private String role; // Ex: ROLE_ADMIN, ROLE_USER
}
