import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockModalComponent } from '../../components/stock-modal/stock-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, StockModalComponent],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  public Math = Math;

  stocks: any[] = [];
  filteredStocks: any[] = [];
  showModal = false;
  selectedStock: any = null;

  // Pagination
  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks(): void {
    this.stockService.getStocks().subscribe({
      next: (data: any) => {
        this.stocks = data;
        this.filteredStocks = [...this.stocks];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Erreur chargement des stocks:', err);
        Swal.fire('Erreur', 'Impossible de charger les stocks', 'error');
      }
    });
  }

  applyFilters(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredStocks = this.stocks.filter((stock: any) =>
      !this.searchQuery ||
      stock.produitNom?.toLowerCase().includes(query) ||
      stock.entrepotNom?.toLowerCase().includes(query) ||
      stock.quantite.toString().includes(query)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  openAddModal(): void {
    this.selectedStock = {
      id: 0,
      quantite: 0,
      produitNom: '',
      entrepotNom: '',
      seuilAlerte: 0
    };
    this.showModal = true;
  }

  openEditModal(stock: any): void {
    this.selectedStock = { ...stock };
    this.showModal = true;
  }

  confirmDelete(stock: any): void {
    Swal.fire({
      title: 'Confirmer la suppression',
      text: `Supprimer le stock de ${stock.produitNom} (${stock.entrepotNom}) ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteStock(stock.id);
      }
    });
  }

  deleteStock(id: number): void {
    this.stockService.deleteStock(id).subscribe({
      next: () => {
        this.stocks = this.stocks.filter((s: any) => s.id !== id);
        this.applyFilters();
        Swal.fire('Supprimé!', 'Le stock a été supprimé.', 'success');
      },
      error: (err) => {
        console.error('Erreur suppression:', err);
        Swal.fire('Erreur', 'Échec de la suppression', 'error');
      }
    });
  }

  onSaveStock(stock: any): void {
    const operation = stock.id 
      ? this.stockService.updateStock(stock.id, stock)
      : this.stockService.createStock(stock);

    operation.subscribe({
      next: () => {
        this.loadStocks();
        this.closeModal();
        Swal.fire('Succès!', 'Stock enregistré avec succès', 'success');
      },
      error: (err) => {
        console.error('Erreur sauvegarde:', err);
        Swal.fire('Erreur', 'Échec de la sauvegarde', 'error');
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedStock = null;
  }

  // Pagination methods
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredStocks.length / this.itemsPerPage) || 1;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPages(): number[] {
    const pagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(pagesToShow / 2));
    let endPage = startPage + pagesToShow - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}