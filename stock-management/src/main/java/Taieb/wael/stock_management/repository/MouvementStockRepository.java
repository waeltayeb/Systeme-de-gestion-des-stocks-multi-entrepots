package Taieb.wael.stock_management.repository;

import Taieb.wael.stock_management.entity.MouvementStock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MouvementStockRepository extends JpaRepository<MouvementStock, Long> {
}
