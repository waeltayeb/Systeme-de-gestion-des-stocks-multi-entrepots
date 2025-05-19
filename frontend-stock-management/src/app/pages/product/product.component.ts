import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Warehouse } from '../../models/warehouse.model';
import { StockMovement } from '../../models/stock-movement.model';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';
import { StockMovementModalComponent } from '../../components/stock-movement-modal/stock-movement-modal.component';

import { ProduitService } from '../../services/produit.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    ProductModalComponent,
    StockMovementModalComponent,
    ToastrModule
    
  ]
})
export class ProductComponent implements OnInit {


  // Propriétés pour la pagination et les filtres
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedSupplier: string = '';
  categories: string[] = [];
  suppliers: string[] = [];
  
  // Propriétés pour les modales
  showProductModal: boolean = false;
  showStockMovementModal: boolean = false;
  showConfirmDialog: boolean = false;
  selectedProduct: Product | null = null;
  productToDelete: Product | null = null;

  // Données
  products: Product[] = [];
  filteredProducts: Product[] = [];
  warehouses: Warehouse[] = [];
  
  public Math = Math;

  constructor(private produitService: ProduitService,
    private toastr: ToastrService 
    
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.produitService.getProduits().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...this.products];
        this.categories = [...new Set(this.products.map(p => p.categorie))];
        this.suppliers = [...new Set(this.products.map(p => p.fournisseur))];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits:', err);
      }
    });
  }



  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchQuery || 
        product.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        product.categorie.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || product.categorie === this.selectedCategory;
      const matchesSupplier = !this.selectedSupplier || product.fournisseur === this.selectedSupplier;
      
      return matchesSearch && matchesCategory && matchesSupplier;
    });
    
    this.currentPage = 1;
    this.updatePagination();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedSupplier = '';
    this.applyFilters();
  }



  // Gestion des modals
  openAddProductModal(): void {
    this.selectedProduct = {
      nom: '',
      categorie: '',
      prix: 0,
      fournisseur: '',
      seuilMin: 1,
    } as Product;
    this.showProductModal = true;
  }

  openEditModal(product: Product): void {
    this.selectedProduct = {...product};
    this.showProductModal = true;
  }

  openStockMovementModal(product: Product): void {
    this.selectedProduct = {...product};
    this.showStockMovementModal = true;
  }

 confirmDelete(product: Product): void {
  this.productToDelete = product;

  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Voulez-vous vraiment supprimer ce produit ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteProduct();
    }
  });
}

  closeModal(): void {
    this.showProductModal = false;
    this.showStockMovementModal = false;
    this.showConfirmDialog = false;
    this.selectedProduct = null;
    this.productToDelete = null;
  }

  saveProduct(product: Product): void {
    if (product.id === null || product.id === undefined) {
      // Ajout d'un nouveau produit
      this.produitService.createProduit(product).subscribe({
        next: (newProduct) => {
          this.products.push(newProduct);
          this.applyFilters();
        },
        error: (err) => console.error('Erreur création produit:', err)
      });
    } else {
      // Mise à jour d'un produit existant
      this.produitService.updateProduit(product.id, product).subscribe({
        next: (updatedProduct) => {
          const index = this.products.findIndex(p => p.id === updatedProduct.id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.applyFilters();
        },
        error: (err) => console.error('Erreur mise à jour produit:', err)
      });
    }
    this.closeModal();
  }



  deleteProduct(): void {
  if (this.productToDelete) {
    this.produitService.deleteProduit(this.productToDelete.id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== this.productToDelete?.id);
        this.applyFilters();
        Swal.fire('Succès', 'Produit supprimé avec succès', 'success');
      },
      error: (err) => {
        console.error('Erreur suppression produit:', err);
        if (err.status === 403) {
          Swal.fire('Accès refusé', 'Seul un administrateur peut supprimer un produit.', 'error');
        } else {
          Swal.fire('Erreur', 'Erreur lors de la suppression du produit', 'error');
        }
      }
    });
  }
}



  // Pagination
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  getPages(): number[] {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}