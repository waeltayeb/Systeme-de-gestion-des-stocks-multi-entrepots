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
        // On passe maintenant l'email et le rôle pour le token
        return jwtUtils.generateToken(utilisateur.getEmail(), utilisateur.getRole());
    }
}
