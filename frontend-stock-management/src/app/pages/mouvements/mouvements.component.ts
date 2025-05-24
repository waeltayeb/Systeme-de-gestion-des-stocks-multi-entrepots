import { Component, OnInit } from '@angular/core';
import { MouvementService } from '../../services/mouvement.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockMovementModalComponent } from '../../components/stock-movement-modal/stock-movement-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mouvements',
  standalone: true,
  imports: [CommonModule, FormsModule, StockMovementModalComponent],
  templateUrl: './mouvements.component.html',
  styleUrls: ['./mouvements.component.css']
})
export class MouvementsComponent implements OnInit {
  public Math = Math;
  mouvements: any[] = [];
  filteredMouvements: any[] = [];
  showModal = false;
  selectedMouvement: any = null;

  // Filtres
  searchQuery = '';
  dateDebut = '';
  dateFin = '';
  typeMouvement = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(private mouvementService: MouvementService) {}

  ngOnInit(): void {
    this.loadMouvements();
  }

  loadMouvements(): void {
    this.mouvementService.getMouvements().subscribe({
      next: (data: any) => {
        this.mouvements = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Erreur chargement des mouvements:', err);
        Swal.fire('Erreur', 'Impossible de charger les mouvements', 'error');
      }
    });
  }

  applyFilters(): void {
    let result = [...this.mouvements];

    // Filtre par recherche texte
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(mvt =>
        mvt.produitNom.toLowerCase().includes(query) ||
        mvt.entrepotNom.toLowerCase().includes(query) ||
        mvt.quantite.toString().includes(query)
      );
    }

    // Filtre par type
    if (this.typeMouvement) {
      result = result.filter(mvt => mvt.type === this.typeMouvement);
    }

    // Filtre par date
    if (this.dateDebut) {
      result = result.filter(mvt => new Date(mvt.date) >= new Date(this.dateDebut));
    }
    if (this.dateFin) {
      const fin = new Date(this.dateFin);
      fin.setDate(fin.getDate() + 1); // Inclure le jour sélectionné
      result = result.filter(mvt => new Date(mvt.date) < fin);
    }

    this.filteredMouvements = result;
    this.currentPage = 1;
    this.updatePagination();
  }

  openAddModal(type: 'ENTREE' | 'SORTIE'): void {
    this.selectedMouvement = {
      id: 0,
      produitNom: '',
      entrepotNom: '',
      type: type,
      quantite: 0,
      date: new Date().toISOString().split('T')[0] // Date du jour
    };
    this.showModal = true;
  }

  onSaveMouvement(mouvement: any): void {
    this.mouvementService.createMouvement(mouvement).subscribe({
      next: () => {
        this.loadMouvements();
        this.closeModal();
        Swal.fire('Succès!', 'Mouvement enregistré avec succès', 'success');
      },
      error: (err) => {
        console.error('Erreur sauvegarde:', err);
        Swal.fire('Erreur', 'Échec de la sauvegarde', 'error');
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedMouvement = null;
  }

  // Pagination methods
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredMouvements.length / this.itemsPerPage) || 1;
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