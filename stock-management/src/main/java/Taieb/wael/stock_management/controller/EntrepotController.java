package Taieb.wael.stock_management.controller;

import Taieb.wael.stock_management.entity.Entrepot;
import Taieb.wael.stock_management.service.EntrepotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/entrepots")
public class EntrepotController {

    @Autowired
    private EntrepotService entrepotService;

    @GetMapping
    public List<Entrepot> getAllEntrepots() {
        return entrepotService.getAllEntrepots();
    }

    @GetMapping("/{id}")
    public Optional<Entrepot> getEntrepotById(@PathVariable Long id) {
        return entrepotService.getEntrepotById(id);
    }

    @PostMapping
    public Entrepot createEntrepot(@RequestBody Entrepot entrepot) {
        return entrepotService.createEntrepot(entrepot);
    }

    @PutMapping("/{id}")
    public Entrepot updateEntrepot(@PathVariable Long id, @RequestBody Entrepot entrepot) {
        return entrepotService.updateEntrepot(id, entrepot);
    }

    @DeleteMapping("/{id}")
    public void deleteEntrepot(@PathVariable Long id) {
        entrepotService.deleteEntrepot(id);
    }
}
