import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { Warehouse } from '../../models/warehouse.model';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
interface StockMovement {
  productId: number;
  type: 'ENTRY' | 'EXIT';
  quantity: number;
  warehouseId: number;
  date: string;
  notes?: string;
}

@Component({
  selector: 'app-stock-movement-modal',
  templateUrl: './stock-movement-modal.component.html',
  styleUrls: ['./stock-movement-modal.component.css'],
  standalone: true, 
  imports: [FormsModule, CommonModule ]
})
export class StockMovementModalComponent {
  @Input() product: Product | null = null;
  @Input() warehouses: Warehouse[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<StockMovement>();

  movement: StockMovement = {
    productId: this.product?.id || 0,
    type: 'ENTRY',
    quantity: 1,
    warehouseId: 0,
    date: new Date().toISOString().slice(0, 16),
    notes: ''
  };

  ngOnChanges(): void {
    if (this.product) {
      this.movement.productId = this.product.id;
    }
  }

  onSubmit(): void {
    this.save.emit(this.movement);
  }
}