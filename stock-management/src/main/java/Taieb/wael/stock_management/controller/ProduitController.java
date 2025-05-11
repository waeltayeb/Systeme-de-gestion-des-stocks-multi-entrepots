package Taieb.wael.stock_management.controller;


import Taieb.wael.stock_management.dto.ProduitDTO;
import Taieb.wael.stock_management.entity.Produit;
import Taieb.wael.stock_management.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "*") // utile si tu appelles l’API depuis Angular
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @GetMapping
    public List<ProduitDTO> getProduits() {
        List<Produit> produits = produitService.getAllProduits();
        return produits.stream()
                .map(ProduitDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Optional<Produit> getProduitById(@PathVariable Long id) {
        return produitService.getProduitById(id);
    }

    @PostMapping
    public Produit createProduit(@RequestBody Produit produit) {
        return produitService.createProduit(produit);
    }

    @PutMapping("/{id}")
    public Produit updateProduit(@PathVariable Long id, @RequestBody Produit produit) {
        return produitService.updateProduit(id, produit);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduit(@PathVariable Long id) {
        produitService.deleteProduit(id);
    }
}

