import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreationProfilComponent } from './components/profil/creation-profil/creation-profil.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { EvenementComponent } from './components/evenement/evenement.component';
import { ProfilEventComponent } from './components/profil-event/profil-event.component';
import { RejoindreEventComponent } from './components/rejoindre-event/rejoindre-event.component';
import { AuthModule } from './modules/auth/auth.module';
//import { IonicStorageModule } from '@ionic/storage-angular';
//import { Drivers } from '@ionic/storage';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LocalStorageService } from './services/local-storage.service';
import { UpdateProfilComponent } from './components/update-profil/update-profil.component';
//import { Share } from '@capacitor/share';
//import { Deeplinks } from '@ionic-native/deeplinks/ngx'
@NgModule({
  declarations: [AppComponent,CreationProfilComponent,LoginComponent,EvenementComponent,ProfilEventComponent,RejoindreEventComponent,UpdateProfilComponent],
  imports: [BrowserModule, IonicModule.forRoot(),HttpClientModule, AppRoutingModule,FormsModule,RouterModule,AuthModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },LocalStorageService,//Share,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  //Deeplinks
],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

