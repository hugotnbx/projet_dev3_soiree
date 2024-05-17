import { Component ,NgZone} from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
//import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Tab1Page } from './tab1/tab1.page';
import { RejoindreEventComponent } from './components/rejoindre-event/rejoindre-event.component';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Router } from '@angular/router';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
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
  ngOnInit() {
    //console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
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
