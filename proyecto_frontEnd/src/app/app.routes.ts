import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { authenticatedGuard } from './core/guards/authenticated.guard';


export const routes: Routes = [

  {
   path:'',
   loadComponent:()=>import('./Pages/layout/layout.component'),
   canActivate:[AuthGuard],
   children:[
      {
         path:'dashboard',
         loadComponent:()=>import('./Pages/dashboard/dashboard.component'),
         canActivate:[AuthGuard],

      },
      {
         path: '',
         redirectTo: 'dashboard',
         pathMatch: 'full'
     }
   ]
  },
  
  {
   path:'login',
   loadComponent:()=> import('./Pages/login/login.component'),
   canActivate:[authenticatedGuard]
  },
  {
   path:'Registrar',
   loadComponent:()=> import('./Pages/registrar/registrar.component'),
  },
  {
   path:'home',
   loadComponent:()=> import('./Pages/home/home.component')
  },
  {
   path:'**',
   redirectTo:'home'
  }

];