import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './components/layout/not-found-page/not-found-page.component';
import { EntryFormComponent} from './components/entry-form/entry-form.component';
import { HomePageComponent } from './components/layout/home-page/home-page.component';
import { RentPageComponent } from './components/layout/rent-page/rent-page.component';
import { AuthGuard } from './common/guards/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    component: EntryFormComponent
  },
  {
    path: 'rent-bike',
    component: RentPageComponent,
    canActivate: [AuthGuard]
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
