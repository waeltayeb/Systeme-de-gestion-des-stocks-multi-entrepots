// entrepot-modal.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entrepot-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entrepot-modal.component.html',
  styleUrls: ['./entrepot-modal.component.css']
})
export class EntrepotModalComponent {
  @Input() entrepot: any = {
    id: 0,
    nom: '',
    adresse: '',
    capacite: 0
  };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  onSubmit(): void {
    this.save.emit(this.entrepot);
  }
}