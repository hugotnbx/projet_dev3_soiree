import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ManageEventService } from 'src/app/services/manage-event.service';
import { Evenement } from 'src/app/interfaces/evenement';
import { ButtonStateService } from '../../services/button-state.service';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Share } from '@capacitor/share';
@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss'],
})
export class EvenementComponent implements OnInit, OnDestroy {
  event: any;
  eventprofil: any;
  @ViewChild('deleteButton') deleteButton!: ElementRef;
  isButtonDisabled: boolean = false; // Variable locale pour stocker l'état du bouton
  buttonStateSubscription: Subscription | undefined;

  constructor(public http: HttpClient, private route: ActivatedRoute, private manageEventService: ManageEventService, private router: Router, private buttonStateService: ButtonStateService, private alertController: AlertController) {}

  ngOnInit() {
    this.loadEventInfos();

    this.manageEventService.updatedEvent$.subscribe((updatedEvent: Evenement) => {
      this.event = updatedEvent;
    });
  }

  loadEventInfos() {
    const paramValue = this.route.snapshot.paramMap.get('id');

    this.readApi(`${environment.api}/events/${paramValue}`).subscribe((data) => {
      console.log(data);
      this.event = data;
      this.buttonStateSubscription = this.buttonStateService.isButtonDisabled$.subscribe((isDisabled: boolean) => {
        this.isButtonDisabled = isDisabled;
      });
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
    this.http.post(`${environment.api}/events/deletevent/${this.event.id}`, {}).subscribe(() => {
      console.log("Événement supprimé avec succès");
      this.event.etatdelete = true;
      this.router.navigateByUrl('tabs/tab1');
    }, (error) => {
      console.error('Erreur lors de la suppression de l\'événement', error);
    });
  }

  ngOnDestroy() {
    if (this.buttonStateSubscription) {
      this.buttonStateSubscription.unsubscribe();
    }
  }

  refreshEventInfos(eventInfos: any) {
    this.loadEventInfos();

    setTimeout(() => {
      eventInfos.target.complete();
    }, 2000);
  }

  readApi(URL: string) {
    return this.http.get(URL);
  }

  getImageUrl(status: string): string {
    if (!status || typeof status !== 'string' || !/^[a-zA-Z]+$/.test(status)) {
        throw new Error('Le statut est invalide.');
    } 

    return `./assets/role/${status}.png`;
  }

  /* isAdmin(role: string): boolean {
    return role === 'Admin';
  } */
  /*async sShare(){
    await Share.share({
      title: "Participer à l'événement",
      text: `Je suis intéressé par votre événement "${this.event.name}"`,
      url: `iziplan//rejoindre`
    })
  }*/

  async sShare() {
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }
}
