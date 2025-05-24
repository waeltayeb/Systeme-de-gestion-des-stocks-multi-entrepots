import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Assurez-vous d'avoir ce service
import Swal from 'sweetalert2';

interface MenuItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isOpen = true;

  menuItems: MenuItem[] = [
    { 
      label: 'Dashboard',
      link: '/dashboard'
    },
    {
      label: 'Produits',
      link: '/produits'
    },
    {
      label: 'Stocks',
      link: '/stocks'
    },
    {
      label: 'Entrepots',
      link: '/entrepots'
    },
    {
      label: 'Mouvements',
      link: '/mouvements'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  logout(): void {
    Swal.fire({
      title: 'Déconnexion',
      text: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, déconnecter',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout(); // Implémentez cette méthode dans votre AuthService
        this.router.navigate(['/login']);
        Swal.fire(
          'Déconnecté!',
          'Vous avez été déconnecté avec succès.',
          'success'
        );
      }
    });
  }
}