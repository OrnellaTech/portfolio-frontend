import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './home/components/about/about';
import { Notfound } from './notfound/notfound';
import { NgModule } from '@angular/core';
import { UserPage } from './pages/user-page/user-page';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    { path: 'utilisateur/:id', component: UserPage }, // page utilisateur
    {
        path: 'not-Found',
        component: Notfound
    },
    {
        path: '**',
        redirectTo: 'not-Found',
    },

    {
        path: 'home',
        redirectTo: 'home',
    },
     
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
