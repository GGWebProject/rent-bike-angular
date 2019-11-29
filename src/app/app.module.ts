import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root/app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundPageComponent } from './components/layout/not-found-page/not-found-page.component';
import { FormComponent } from './shared/components/form/form.component';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './components/layout/home-page/home-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CapitalizePipe } from './common/pipes/capitalize.pipe';
import { RentPageComponent } from './components/layout/rent-page/rent-page.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './common/interceptors/intex';
import { UserEffect } from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    NotFoundPageComponent,
    FormComponent,
    HomePageComponent,
    NavigationComponent,
    CapitalizePipe,
    RentPageComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([AppEffects, UserEffect]),
    StoreRouterConnectingModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
