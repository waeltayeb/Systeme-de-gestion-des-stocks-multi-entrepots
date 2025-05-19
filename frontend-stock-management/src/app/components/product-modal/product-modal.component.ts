import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
  standalone: true, 
  imports: [FormsModule] 
})
export class ProductModalComponent {
  @Input() product: Product = {
    id: 0,
    nom: '',
    categorie: '',
    prix: 0,
    fournisseur: '',
    seuilMin: 1,
  };

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Product>();

  onSubmit(): void {
    this.save.emit(this.product);
  }
}