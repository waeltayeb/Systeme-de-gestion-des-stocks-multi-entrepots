package Taieb.wael.stock_management.controller;

import Taieb.wael.stock_management.entity.MouvementStock;
import Taieb.wael.stock_management.service.MouvementStockService;
import Taieb.wael.stock_management.dto.MouvementStockDTO;
import org.springframework.beans.factory.annotation.Autowired;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mouvements")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MouvementStockController {

    @Autowired
    private MouvementStockService mouvementStockService;

    @GetMapping
    public List<MouvementStock> getAllMouvements() {
        return mouvementStockService.getAllMouvements();
    }

    @GetMapping("/{id}")
    public Optional<MouvementStock> getMouvementById(@PathVariable Long id) {
        return mouvementStockService.getMouvementById(id);
    }

    @PostMapping
    public ResponseEntity<String> ajouterMouvement(@RequestBody MouvementStockDTO dto) {
        mouvementStockService.createMouvementStock(dto);

        return ResponseEntity.ok("Mouvement de stock ajouté avec succès !");
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteMouvement(@PathVariable Long id) {
        mouvementStockService.deleteMouvement(id);
    }
}
