import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { EvenementComponent } from './components/evenement/evenement.component';
import { CreationComponent } from './components/creation/creation.component';
import { InvitationsComponent } from './components/invitations/invitations.component';
import { ProfilComponent } from './components/profil/profil.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AccueilComponent,
    EvenementComponent,
    CreationComponent,
    InvitationsComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot({})
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
