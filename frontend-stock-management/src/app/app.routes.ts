import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },



     {
    path: 'dashboard',
    component: SidebarComponent, // Layout avec sidebar
    children: [
      { path: '', component: DashboardComponent },
    ]
  },
    




   // { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) }

];
