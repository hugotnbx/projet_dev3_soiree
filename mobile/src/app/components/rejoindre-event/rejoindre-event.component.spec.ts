import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { RejoindreEventComponent } from './rejoindre-event.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('RejoindreEventComponent', () => {
  let component: RejoindreEventComponent;
  let fixture: ComponentFixture<RejoindreEventComponent>;
  let httpMock : HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RejoindreEventComponent ],
      imports: [IonicModule.forRoot(),HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RejoindreEventComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  }));
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test calculer si selectionner', () => {
    component.aliments = [
      { prix: "10", selected: true },
      { prix: "20", selected: false },
      { prix: "15", selected: true }
    ];
    expect(component.getTotal()).toEqual("25.00");
  });

  it('test calculer si aucun sélectionner', () => {
    component.aliments = [
      { prix: "10", selected: false },
      { prix: "20", selected: false },
      { prix: "15", selected: false }
    ];
    expect(component.getTotal()).toEqual("0.00");
 
  });

  it('teste si aucune contribution', () => {
    
    spyOn(console, 'error');
    component.aliments = null;
    const total = component.getTotal();
    expect(console.error).toHaveBeenCalledWith("Erreur : this.aliments n'est pas un objet valide");
    expect(total).toEqual("0.00");
  });
  
  
  it('test optionSelected false -> true ', () => {
    const ali = { selected: false };
    component.toggleSelection(ali);
    expect(ali.selected).toBe(true);

  });

  it('test optionSelected true -> false ', () => {
    const ali = { selected: true };
    component.toggleSelection(ali);
    expect(ali.selected).toBe(false);

  });

  it('test toggleSelected true -> false -> true ', () => {
    const ali = { selected: true };
    component.toggleSelection(ali);
    expect(ali.selected).toBe(false);
    component.toggleSelection(ali);
    expect(ali.selected).toBe(true);
  });


  it('test bouton 1', () => {
    component.selectOption(1);
    expect(component.selectedOption).toBe(1);
  });

  it('test bouton 2', () => {
    component.selectOption(2);
    expect(component.selectedOption).toBe(2);
  });

  it('test bouton 1 et 2 a la suite', () => {
    
    component.selectOption(2);
    expect(component.selectedOption).toBe(2);

    component.selectOption(1);
    expect(component.selectedOption).toBe(1);
  });

  it('test get correct et dispose dans la bonne partie du html', () => {
    
    const mockAliments = [
      {
        idContribution: 1,
        nom: "24 X carapils",
        prix: "12.50"
      },
      {
        idContribution: 2,
        nom: "chips",
        prix: "3.30"
      },
      {
        idContribution: 3,
        nom: "pain",
        prix: "4.20"
      }
    ];
    
    const req = httpMock.expectOne('http://localhost:64000/contributions');
    expect(req.request.method).toBe('GET');
    req.flush(mockAliments);
    fixture.detectChanges();
    const ionCards = fixture.debugElement.queryAll(By.css('.aliment ion-card'));
    expect(ionCards.length).toBe(mockAliments.length);
      ionCards.forEach((ionCard, index) => {
      const aliment = mockAliments[index];
      const cardContent = ionCard.query(By.css('.item-label')).nativeElement.textContent.trim();
      expect(cardContent).toContain(`${aliment.nom} - ${aliment.prix}€`);
    });
  });

it('test envoyer un événement a la base de données post', () => {
  const mockAliments = [
    { idContribution: 1, selected: true },
    { idContribution: 2, selected: false },
    { idContribution: 3, selected: false }
  ];

  spyOn(component.http, 'post').and.returnValue(of({}));

  component.aliments = mockAliments;
  component.selectedOption = 1; 

  component.rejoindreEvent();

  mockAliments
    .filter(aliment => aliment.selected)
    .forEach(selectedAliment => {
      const expectedRejoindre = {
        idEvent: 125,
        idProfil: "neut",
        idContribution: selectedAliment.idContribution,
        idStatus: component.selectedOption, 
        role: ""
      };
      
      expect(component.http.post).toHaveBeenCalledWith(
        'http://localhost:64000/users-relations',
        expectedRejoindre
      );
    });
});





});
