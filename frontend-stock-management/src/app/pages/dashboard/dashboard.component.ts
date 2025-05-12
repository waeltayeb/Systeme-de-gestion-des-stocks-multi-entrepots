import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProduitService } from '../../services/produit.service';
import { MouvementService } from '../../services/mouvement.service';
import { EntrepotService } from '../../services/entrepot.service';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  produitsTotal = 0;
  mouvementsTotal = 0;
  entrepotsTotal = 0;
  stocksTotal = 0;

  constructor(
    private produitService: ProduitService,
    private mouvementService: MouvementService,
    private entrepotService: EntrepotService,
    private stockService: StockService
  ) {}

  ngOnInit() {
    this.loadAllData();
  }

  private loadAllData() {
    forkJoin({
      produits: this.produitService.getProduits(),
      mouvements: this.mouvementService.getMouvements(),
      entrepots: this.entrepotService.getEntrepots(),
      stocks: this.stockService.getStocks()
    }).subscribe({
      next: ({ produits, mouvements, entrepots, stocks }) => {
        this.produitsTotal = produits.length;
        this.mouvementsTotal = mouvements.length;
        this.entrepotsTotal = entrepots.length;
        this.stocksTotal = stocks.length;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données:', err);
        // Gestion d'erreur globale
      }
    });
  }
}