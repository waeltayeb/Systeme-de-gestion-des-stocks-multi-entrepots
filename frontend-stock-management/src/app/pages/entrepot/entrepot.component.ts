import { Component, OnInit } from '@angular/core';
import { EntrepotService } from '../../services/entrepot.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntrepotModalComponent } from '../../components/entrepot-modal/entrepot-modal.component';
import { Entrepot } from '../../models/entrepot.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrepot',
  standalone: true,
  imports: [CommonModule, FormsModule, EntrepotModalComponent],
  templateUrl: './entrepot.component.html',
  styleUrls: ['./entrepot.component.css']
})
export class EntrepotComponent implements OnInit {
  public Math = Math;
  entrepots: Entrepot[] = [];
  filteredEntrepots: Entrepot[] = [];
  showModal = false;
  showConfirmDialog = false;
  selectedEntrepot: Entrepot | null = null;
  entrepotToDelete: Entrepot | null = null;

  // Filtres
  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(private entrepotService: EntrepotService) {}

  ngOnInit(): void {
    this.loadEntrepots();
  }

  loadEntrepots(): void {
    this.entrepotService.getEntrepots().subscribe({
      next: (data: Entrepot[]) => {
        this.entrepots = data;
        this.filteredEntrepots = [...this.entrepots];
        this.updatePagination();
      },
      error: (err) => console.error('Erreur chargement entrepôts:', err)
    });
  }

  applyFilters(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredEntrepots = this.entrepots.filter(entrepot => 
      !this.searchQuery || 
      entrepot.nom.toLowerCase().includes(query) ||
      entrepot.adresse.toLowerCase().includes(query)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  openAddModal(): void {
    this.selectedEntrepot = {
      
      nom: '',
      adresse: '',
      capacite: 0
    } as Entrepot;

    this.showModal = true;
  }

  openEditModal(entrepot: Entrepot): void {
    this.selectedEntrepot = { ...entrepot };
    this.showModal = true;
  }




   confirmDelete(entrepot: Entrepot): void {
    this.entrepotToDelete = entrepot;
  
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer ce produit ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEntrepot();
      }
    });
  }

    deleteEntrepot(): void {
    if (this.entrepotToDelete) {
      this.entrepotService.deleteEntrepot(this.entrepotToDelete.id).subscribe({
        next: () => {
          this.entrepots = this.entrepots.filter(p => p.id !== this.entrepotToDelete?.id);
          this.applyFilters();
          Swal.fire('Succès', 'entrepot supprimé avec succès', 'success');
        },
        error: (err) => {
          console.error('Erreur suppression entrepot:', err);
          if (err.status === 403) {
            Swal.fire('Accès refusé', 'Seul un administrateur peut supprimer un entrepot.', 'error');
          } else {
            Swal.fire('Erreur', 'Erreur lors de la suppression du entrepot', 'error');
          }
        }
      });
    }
  }

  

  saveEntrepot(entrepot: Entrepot): void {
  if (!entrepot.id) {
    // Création (POST)
    this.entrepotService.createEntrepot(entrepot).subscribe({
      next: (newEntrepot) => {
        this.entrepots.push(newEntrepot);
        this.applyFilters();
        this.closeModal();
      },
      error: (err) => console.error('Erreur lors de l\'ajout de l\'entrepôt :', err)
    });
  } else {
    // Modification (PUT)
    this.entrepotService.updateEntrepot(entrepot.id, entrepot).subscribe({
      next: (updatedEntrepot) => {
        const index = this.entrepots.findIndex(e => e.id === updatedEntrepot.id);
        if (index !== -1) {
          this.entrepots[index] = updatedEntrepot;
        }
        this.applyFilters();
        this.closeModal();
      },
      error: (err) => console.error('Erreur lors de la modification de l\'entrepôt :', err)
    });
  }
}


  closeModal(): void {
    this.showModal = false;
    this.showConfirmDialog = false;
    this.selectedEntrepot = null;
    this.entrepotToDelete = null;
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredEntrepots.length / this.itemsPerPage);
  }

  getPages(): number[] {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}
