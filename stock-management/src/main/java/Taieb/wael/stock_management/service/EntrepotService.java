package Taieb.wael.stock_management.service;

import Taieb.wael.stock_management.entity.Entrepot;
import Taieb.wael.stock_management.repository.EntrepotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntrepotService {

    @Autowired
    private EntrepotRepository entrepotRepository;

    public List<Entrepot> getAllEntrepots() {
        return entrepotRepository.findAll();
    }

    public Optional<Entrepot> getEntrepotById(Long id) {
        return entrepotRepository.findById(id);
    }

    public Entrepot createEntrepot(Entrepot entrepot) {
        return entrepotRepository.save(entrepot);
    }

    public Entrepot updateEntrepot(Long id, Entrepot updated) {
        return entrepotRepository.findById(id).map(entrepot -> {
            entrepot.setNom(updated.getNom());
            entrepot.setAdresse(updated.getAdresse());
            entrepot.setCapacite(updated.getCapacite());
            return entrepotRepository.save(entrepot);
        }).orElse(null);
    }

    public void deleteEntrepot(Long id) {
        entrepotRepository.deleteById(id);
    }
}
