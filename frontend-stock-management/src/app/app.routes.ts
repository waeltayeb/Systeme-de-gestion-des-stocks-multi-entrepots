import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ProductComponent } from './pages/product/product.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: SidebarComponent, // Layout avec sidebar
    children: [{ path: '', component: DashboardComponent, canActivate: [AuthGuard] }],
  },
  {
    path: 'produits',
    component: SidebarComponent, // Layout avec sidebar
    children: [{ path: '', component: ProductComponent, canActivate: [AuthGuard] }],
  },
  { path: '**', redirectTo: 'dashboard' }

];
