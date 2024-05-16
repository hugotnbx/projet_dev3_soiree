import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contribution } from 'src/app/interfaces/contribution';
import { contribution } from './popover'
import { PopoverController } from '@ionic/angular';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  contributionData:Contribution={
    idContribution:0,
    nom:"",
    prix:0,
  }

  constructor(private http: HttpClient, private popCtrl: PopoverController) { }

  contributions: any[] = [];
  showInput: boolean = false;
  newContribution: string = '';
  atLeastOneSelected: boolean = false;

  ngOnInit() {
    this.readApi(`${environment.api}/contributions`);
    //this.loadSelectedContributions();
  }

  // loadSelectedContributions() {
  //   this.storage.get('selectedContributions').then((selectedContributions) => {
  //     if (selectedContributions) {
  //       this.selectedContributions = selectedContributions;
  //       this.updateSelections();
  //     }
  //   });
  // }

  // updateSelections() {
  //   this.contributions.forEach(contrib => {
  //     contrib.selected = this.selectedContributions.some(selected => selected.id === contrib.id);
  //   });
  // }

  readApi(url: string) {
    this.http.get<any[]>(url).subscribe((data) => {
      this.contributions = data;
    });
  }

  toggleInput() {
    if (!this.showInput) {
      this.showInput = true;
    }
  }

  newContribtion:any;

  ajouterContribution(){
    //console.log(this.newContribution)
    this.newContribtion = new contribution (this.contributionData);
  
    this.http.post<any>(`${environment.api}/contributions`, this.newContribtion)
      .subscribe(contributionResponse => {
        console.log(contributionResponse);
        this.contributions.push(contributionResponse);

        this.contributionData = {
          idContribution: 0,
          nom: "",
          prix: 0
        };

        this.showInput = false;
      })
      
  }

  selectedContributions: any[] = [];

  toggleSelection(contrib: { selected: boolean; }) {
    contrib.selected = !contrib.selected;

    if (contrib.selected) {
        this.selectedContributions.push(contrib);
    } else {
        const index = this.selectedContributions.findIndex(c => c === contrib);
        if (index !== -1) {
            this.selectedContributions.splice(index, 1);
        }
    }
    this.atLeastOneSelected = this.selectedContributions.length > 0;
    this.showInput = false;

    // this.storage.set('selectedContributions', this.selectedContributions);
  }

  afficherContribution(){
    this.popCtrl.dismiss(this.selectedContributions);
  }

}
