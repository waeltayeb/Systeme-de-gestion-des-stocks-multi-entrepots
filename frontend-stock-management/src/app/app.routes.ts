import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ProductComponent } from './pages/product/product.component';
import { AuthGuard } from './guards/auth.guard';
import { EntrepotComponent } from './pages/entrepot/entrepot.component';
import { StockComponent } from './pages/stock/stock.component';
import { MouvementsComponent } from './pages/mouvements/mouvements.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
  {
    path: 'entrepots',
    component: SidebarComponent, // Layout avec sidebar
    children: [{ path: '', component: EntrepotComponent, canActivate: [AuthGuard] }],
  },
   {
    path: 'stocks',
    component: SidebarComponent, // Layout avec sidebar
    children: [{ path: '', component: StockComponent, canActivate: [AuthGuard] }],
  },
  {
    path: 'mouvements',
    component: SidebarComponent, // Layout avec sidebar
    children: [{ path: '', component: MouvementsComponent, canActivate: [AuthGuard] }],
  },
  { path: '**', redirectTo: 'dashboard' }

];
