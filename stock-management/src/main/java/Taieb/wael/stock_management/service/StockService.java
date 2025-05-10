package Taieb.wael.stock_management.service;

import Taieb.wael.stock_management.entity.Stock;
import Taieb.wael.stock_management.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Optional<Stock> getStockById(Long id) {
        return stockRepository.findById(id);
    }

    public Stock createStock(Stock stock) {
        return stockRepository.save(stock);
    }

    public Stock updateStock(Long id, Stock updatedStock) {
        return stockRepository.findById(id)
                .map(stock -> {
                    stock.setQuantite(updatedStock.getQuantite());
                    stock.setSeuilAlerte(updatedStock.getSeuilAlerte());
                    stock.setProduit(updatedStock.getProduit());
                    stock.setEntrepot(updatedStock.getEntrepot());
                    return stockRepository.save(stock);
                })
                .orElse(null);
    }

    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }
}
