import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">
            {{ stock.id ? 'Modifier' : 'Ajouter' }} un stock
          </h2>
          
          <form (ngSubmit)="onSubmit()">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="produitNom">
                Nom du produit
              </label>
              <input [(ngModel)]="stock.produitNom" name="produitNom" id="produitNom"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     required>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="entrepotNom">
                Nom de l'entrepôt
              </label>
              <input [(ngModel)]="stock.entrepotNom" name="entrepotNom" id="entrepotNom"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     required>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="quantite">
                Quantité
              </label>
              <input type="number" [(ngModel)]="stock.quantite" name="quantite" id="quantite"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     required min="0">
            </div>

            <div class="mb-4" *ngIf="stock.seuilAlerte !== undefined">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="seuilAlerte">
                Seuil d'alerte
              </label>
              <input type="number" [(ngModel)]="stock.seuilAlerte" name="seuilAlerte" id="seuilAlerte"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     min="0">
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" (click)="close.emit()"
                      class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Annuler
              </button>
              <button type="submit"
                      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class StockModalComponent {
  @Input() stock: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  onSubmit(): void {
    this.save.emit(this.stock);
  }
}