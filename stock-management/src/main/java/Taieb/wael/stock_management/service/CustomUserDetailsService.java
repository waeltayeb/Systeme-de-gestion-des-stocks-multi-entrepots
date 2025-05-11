package Taieb.wael.stock_management.service;

import Taieb.wael.stock_management.entity.Utilisateur;
import Taieb.wael.stock_management.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable avec l’email : " + email));

        return new User(
                utilisateur.getEmail(),
                utilisateur.getMotDePasse(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + utilisateur.getRole().toUpperCase())
                )
        );
    }
}
