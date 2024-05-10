import { Component ,NgZone} from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
//import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Tab1Page } from './tab1/tab1.page';
import { RejoindreEventComponent } from './components/rejoindre-event/rejoindre-event.component';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    //private deeplinks: Deeplinks,
    private zone:NgZone,
    private router :Router,
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.setupDeepLinks();
    });
  }

  setupDeepLinks() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
          // Example url: https://beerswift.app/tabs/tab2
          // slug = /tabs/tab2
          const slug = event.url.split(".app").pop();
          if (slug) {
              this.router.navigateByUrl(slug);
          }
          // If no match, do nothing - let regular routing
          // logic take over
      });
  });
  }
}
