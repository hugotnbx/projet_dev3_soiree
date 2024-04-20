import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreationProfilComponent } from './components/profil/creation-profil/creation-profil.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { EvenementComponent } from './components/evenement/evenement.component';
import { ProfilEventComponent } from './components/profil-event/profil-event.component';
import { RejoindreEventComponent } from './components/rejoindre-event/rejoindre-event.component';


@NgModule({
  declarations: [AppComponent,CreationProfilComponent,LoginComponent,EvenementComponent,ProfilEventComponent,RejoindreEventComponent],
  imports: [BrowserModule, IonicModule.forRoot(),HttpClientModule, AppRoutingModule,FormsModule, RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
