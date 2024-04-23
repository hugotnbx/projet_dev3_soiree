import { Component } from '@angular/core';
import { Deeplinks } from '@awesome-cordova-plugins/deeplinks/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private route: Router,
    private deeplinks: Deeplinks
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.deeplinks.route({
      '/:id': {}
    }).subscribe(match => {
      this.route.navigateByUrl(`rejoindre`/*,match.$args['id']*/);
    }, nomatch => {
      
      console.error('Got a deeplink that didn\'t match', nomatch);
    });
  }
}
