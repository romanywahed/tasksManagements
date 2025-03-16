import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
export const authGuard = () => {
  const cookieService = inject(CookieService);
  return cookieService.get('auth_token') ? true : '/login';
};
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: DashboardComponent },

// { path: 'tasks', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },
{ path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
