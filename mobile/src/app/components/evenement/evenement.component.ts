import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ButtonStateService } from '../../services/button-state.service';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

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

  constructor(public http: HttpClient, private route: ActivatedRoute, private router: Router, private buttonStateService: ButtonStateService, private alertController: AlertController) {}

  ngOnInit() {
    this.loadEventInfos();
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
    return `./assets/role/${status}.png`;
  }
}
