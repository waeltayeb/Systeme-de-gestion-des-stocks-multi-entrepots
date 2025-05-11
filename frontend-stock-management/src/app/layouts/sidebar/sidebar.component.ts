import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  link: string;
  icon: SafeHtml; // Modifier le type ici
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

  menuItems: MenuItem[];

  constructor(private sanitizer: DomSanitizer) {
    this.menuItems = [
      this.createMenuItem(
        'Dashboard', 
        '/dashboard',
        'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
      ),
      this.createMenuItem(
        'Stocks',
        '/stocks',
        'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
      )
    ];
  }

  private createMenuItem(label: string, link: string, iconPath: string): MenuItem {
    const sanitizedIcon = this.sanitizer.sanitize(
      SecurityContext.HTML,
      `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"/>
       </svg>`
    );
    
    return {
      label,
      link,
      icon: this.sanitizer.bypassSecurityTrustHtml(sanitizedIcon || '')
    };
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}