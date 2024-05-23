import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./routes/home.component').then((c) => c.HomeComponent)
    },
    {
        path: ':key',
        loadComponent: () => import('./routes/content.component').then((c) => c.ContentComponent)
    }
];
