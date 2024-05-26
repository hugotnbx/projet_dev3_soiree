import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contribution } from 'src/app/interfaces/contribution';
import { contribution } from './popover'
import { PopoverController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  contributionData: Contribution = {
    idContribution: 0,
    nom: "",
    prix: 0,
  }
  existingContributions: any[] = [];

  constructor(private http: HttpClient, private popCtrl: PopoverController, private navParams: NavParams) { 
    this.readApi(`${environment.api}/contributions`);
  }

  contributions: any[] = [];
  filteredContributions: any[] = [];
  showInput: boolean = false;
  newContribution: string = '';
  atLeastOneSelected: boolean = false;
  searchTerm: string = '';

  ngOnInit() {}

  readApi(url: string) {
    this.http.get<any[]>(url).subscribe((data) => {
      this.contributions = data.filter(contribution => contribution.idContribution !== 1);
      this.existingContributions = this.navParams.get('existingContributions') || [];
      if (this.existingContributions.length == 0) { }
      else {
        for (let i in this.existingContributions) {
          for (let a in this.contributions) {
            if (this.existingContributions[i].idContribution == this.contributions[a].idContribution) {
              this.contributions[a].selected = this.existingContributions[i].selected
            }
          }
        }
      }
      this.filterContributions();
    });
  }

  toggleInput() {
    if (!this.showInput) {
      this.showInput = true;
    }
  }

  newContribtion: any;

  ajouterContribution() {
    this.newContribtion = new contribution(this.contributionData);

    this.http.post<any>(`${environment.api}/contributions`, this.newContribtion)
      .subscribe(contributionResponse => {
        console.log(contributionResponse);
        if (contributionResponse.idContribution !== 1) {
          this.contributions.push(contributionResponse);
          this.filterContributions();
        }

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
  }

  afficherContribution() {
    this.popCtrl.dismiss(this.selectedContributions);
  }

  filterContributions() {
    if (this.searchTerm.trim() === '') {
      this.filteredContributions = [];
    } else {
      this.filteredContributions = this.contributions.filter((contrib) => {
        return contrib.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    }
  }
}
