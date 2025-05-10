package Taieb.wael.stock_management.service;

import Taieb.wael.stock_management.entity.Utilisateur;
import Taieb.wael.stock_management.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtUtils jwtUtils;

    public String generateToken(Utilisateur utilisateur) {
        // Ici on utilise juste l'email comme username pour le token
        return jwtUtils.generateToken(utilisateur.getEmail());
    }
}
