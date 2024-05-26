import { Component, OnInit } from '@angular/core';
import { evenement, relation } from './tab2';
import { Evenement } from 'src/app/interfaces/evenement';
import { json } from 'express';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Relation } from '../interfaces/relation';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { ManageEventService } from '../services/manage-event.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  userId: any;

  eventData: Evenement = {
    id: 0,
    nom: "",
    heure: "",
    date: new Date().toISOString().slice(0, 10),
    lieu: "",
    nbrLit: 0,
    nbrBob: 0
  }

  relationData: Relation = {
    idProfil: 0,
    idEvent: 0,
    idContribution: 1,
    idStatus: 3,
  }

  maxDate: string;
  minDate: string;
  selectedContributions: any[] = [];
  selectedContributionsMap: any[] = [];
  showContrib: boolean = false;

  constructor(public http: HttpClient, private router: Router, private localStorage: LocalStorageService, private manageEventService: ManageEventService, private popCtrl: PopoverController) {
    const now = new Date();
    const maxYear = now.getFullYear() + 10;
    this.maxDate = new Date(maxYear, 11, 31).toISOString().slice(0, 10);
    this.minDate = new Date().toISOString().slice(0, 10);

    const token = localStorage.getItem("ACCESS_TOKEN");
    this.userId = token?.split(".")
    this.userId = JSON.parse(atob(this.userId[1]))
    this.relationData.idProfil = this.userId.username;
    console.log(this.userId.username);
  }

  isNumAndPositive(value: any): boolean {
    return isNaN(Number(value)) || value < 0;
  }

  eventDateTime!: string;

  async openPopover(ev: any) {
    const popover = await this.popCtrl.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
      cssClass: 'custom-popover popover-top',
      mode: 'ios',
      backdropDismiss: true,
      animated: true,
      componentProps: {
        existingContributions: this.selectedContributionsMap
      },
    })

    popover.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.selectedContributions = dataReturned.data;
        if (this.selectedContributions == undefined) { }
        else {
          if (this.selectedContributionsMap.length == 0) {
            this.selectedContributionsMap = this.selectedContributions.slice()
          }
          else {
            for (let i in this.selectedContributions) {
              let alreadyIn: Boolean = false;
              for (let a in this.selectedContributionsMap) {
                if (this.selectedContributions[i].idContribution == this.selectedContributionsMap[a].idContribution) {
                  alreadyIn = true;
                  break;
                }
              }
              if (!alreadyIn) {
                this.selectedContributionsMap.push(this.selectedContributions[i])
              }
            }
          }
        }
        if (this.selectedContributionsMap.length > 0 && (this.selectedContributions == undefined || this.selectedContributions.length > 0))
          this.showContrib = true;
      }
    });
    return await popover.present()
  }

  onDateTimeChange(event: CustomEvent) {
    this.eventDateTime = event.detail.value;
    const dateTime = new Date(this.eventDateTime);

    const date = dateTime.toLocaleDateString('fr-CA')

    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    this.eventData.date = date;
    this.eventData.heure = time;

    console.log("Date :", this.eventData.date);
    console.log("Heure :", this.eventData.heure);
  }

  contributions: any[] = [];

  readApi(url: string) {
    this.http.get<any[]>(url).subscribe((data) => {
      this.contributions = data.filter(contribution => contribution.idContribution !== 1);
      console.log(this.contributions);
    });
  }

  newEvent: any;
  newRelation: any;
  errorMessage: string = '';

  creationEvent() {
    if (this.eventData.nbrLit > 10) {
      this.errorMessage = "Vous ne pouvez pas proposer plus de 10 lits";
      return;
    }

    this.newEvent = new evenement(this.eventData);

    this.http.post<any>(`${environment.api}/events`, this.newEvent)
      .subscribe(eventResponse => {
        console.log(eventResponse);
        this.relationData.idEvent = eventResponse.id;

        this.newRelation = new relation(this.relationData);

        this.addContribution(1);

        if (this.selectedContributionsMap.length > 0) {
          for (let long = 0; long < this.selectedContributionsMap.length; long++) {
            if (this.selectedContributionsMap[long].selected == true) {
              console.log(this.selectedContributionsMap[long].idContribution);
              this.addContribution(this.selectedContributionsMap[long].idContribution);
            }
          }
        } else {
          this.addContribution(1);
        }

        this.router.navigateByUrl(`/evenement/${eventResponse.id}`);
      });

    this.errorMessage = '';
    this.manageEventService.shareNewEvent(this.newEvent);
  }

  addContribution(idContribution: number) {
    const relation = { ...this.relationData, idContribution: idContribution };
    this.http.post<any>(`${environment.api}/users-relations`, relation)
      .subscribe(response => {
        console.log(response);
      });
  }

  removeContribution(item: any) {
    item.selected = false;
    const index = this.selectedContributionsMap.indexOf(item);
    if (index > -1) {
      this.selectedContributionsMap.splice(index, 1);
    }

    if (this.selectedContributionsMap.length == 0) {
      this.showContrib = false;
    }
  }

  ngOnInit() {
    this.readApi(`${environment.api}/contributions`);
  }
}
