import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}