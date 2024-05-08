import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ButtonStateService } from '../../services/button-state.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss'],
})
export class EvenementComponent  implements OnInit {

  event:any;
  eventprofil:any;
  @ViewChild('deleteButton') deleteButton!: ElementRef;

  constructor(public http: HttpClient, private route: ActivatedRoute, private router: Router, private buttonStateService: ButtonStateService,private alertController: AlertController) {}

  ngOnInit() {
    this.loadEventInfos();
  }

  loadEventInfos(){
    const paramValue = this.route.snapshot.paramMap.get('id');

    this.readApi(`${environment.api}/events/${paramValue}`).subscribe((data) => {
      console.log(data);
      this.event = data;
    });

    this.readApi(`${environment.api}/users-relations/get-user-relations/${paramValue}`).subscribe((data) => {
      console.log(data);
      this.eventprofil = data;
    });
  }

  onClickDelete() {
    console.log('deleteButton:', this.deleteButton);
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir supprimer cet événement ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.deleteEvent();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteEvent() {
        if (this.deleteButton && this.deleteButton.nativeElement) {
      this.deleteButton.nativeElement.style.opacity = '0.5';
      this.deleteButton.nativeElement.disabled = true;
    }
  
    this.buttonStateService.disableButton(); // Met à jour l'état du bouton dans le service
    this.router.navigateByUrl('tabs/tab1');
  }

  

  refreshEventInfos(eventInfos:any) {
    this.loadEventInfos();

    setTimeout(() => {
      eventInfos.target.complete();
    }, 2000);
  }

  readApi(URL: string) {
    return this.http.get(URL);
  }

  getImageUrl(status: string): string {
    return `./assets/role/${status}.png`;
  }

  /* isAdmin(role: string): boolean {
    return role === 'Admin';
  } */
}