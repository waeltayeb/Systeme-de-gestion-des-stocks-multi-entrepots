package Taieb.wael.stock_management.service;

import Taieb.wael.stock_management.dto.AuthResponse;
import Taieb.wael.stock_management.dto.RegisterRequest;
import Taieb.wael.stock_management.dto.LoginRequest;
import Taieb.wael.stock_management.entity.Utilisateur;
import Taieb.wael.stock_management.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UtilisateurRepository UtilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        // Vérifie si l'utilisateur existe déjà
        if (UtilisateurRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email déjà utilisé.");
        }

        Utilisateur user = Utilisateur.builder()
                .email(request.getEmail())
                .motDePasse(passwordEncoder.encode(request.getMotDePasse()))
                .nom(request.getNom())
                .role("user")
                .build();

        UtilisateurRepository.save(user);

        String token = jwtService.generateToken(user);
        String role = user.getRole();
        return new AuthResponse(token, role );
    }
    public AuthResponse login(LoginRequest request) {
        Utilisateur user = UtilisateurRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (!passwordEncoder.matches(request.getMotDePasse(), user.getMotDePasse())) {
            throw new RuntimeException("Mot de passe incorrect");
        }

        String token = jwtService.generateToken(user);
        String role = user.getRole();
        return new AuthResponse(token, role);
    }

}
