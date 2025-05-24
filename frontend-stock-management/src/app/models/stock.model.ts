import { Product } from './product.model';
import { Entrepot } from './entrepot.model';

export interface Stock {
  id: number;
  nom: string;
  quantite: number;
  seuilAlerte: number;
  produit: Product;
  entrepot: Entrepot;

  // optionnel ou supprimer
  produitNom?: string;
  entrepotNom?: string;
}
