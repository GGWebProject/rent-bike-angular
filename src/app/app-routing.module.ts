import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {LoginFormComponent} from './components/login/login-form/login-form.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {RentPageComponent} from './components/rent-page/rent-page.component';
import {CanActivateLoginGuard} from './common/guards/can-activate-login.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'rent-bike',
    component: RentPageComponent,
    canActivate: [CanActivateLoginGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
