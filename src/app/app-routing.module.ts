import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundPageComponent} from './components/layout/not-found-page/not-found-page.component';
import {LoginFormComponent} from './components/login/login-form/login-form.component';
import {HomePageComponent} from './components/layout/home-page/home-page.component';
import {RentPageComponent} from './components/layout/rent-page/rent-page.component';
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
    component: NotFoundPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
