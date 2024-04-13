import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu/menu.component';
import { CreationProfilComponent } from './components/profil/creation-profil/creation-profil.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { EvenementComponent } from './components/evenement/evenement.component';
import { ProfilEventComponent } from './components/profil-event/profil-event.component';
import { RejoindreEventComponent } from './components/rejoindre-event/rejoindre-event.component';
import { AuthModule } from './modules/auth/auth.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { StorageService } from './services/storage.service';
@NgModule({
  declarations: [AppComponent,MenuComponent,CreationProfilComponent,LoginComponent,EvenementComponent,ProfilEventComponent,RejoindreEventComponent],
  imports: [BrowserModule, IonicModule.forRoot(),HttpClientModule, AppRoutingModule,FormsModule,AuthModule,IonicStorageModule.forRoot(
    {driverOrder: [Drivers.SecureStorage, Drivers.IndexedDB, Drivers.LocalStorage]}
  )],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },StorageService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
