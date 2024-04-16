import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EvenementComponent } from './evenement.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EvenementComponent', () => {
  let component: EvenementComponent;
  let fixture: ComponentFixture<EvenementComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EvenementComponent],
      imports: [IonicModule.forRoot(), HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 1
              }
            }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should inject event data into HTML elements', () => {
    component.event = {
      nom: 'Bières entre potes',
      date: '2024-04-15',
      heure: '22:00',
      lieu: 'Rue du test unitaire',
      nbrLit: 10,
      nbrBob: 5
    };

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#event-name').textContent).toContain('Bières entre potes');
    expect(compiled.querySelector('#date-time').textContent).toContain('2024-04-15 à 22:00');
    expect(compiled.querySelector('#location').textContent).toContain('Rue du test unitaire');
    expect(compiled.querySelector('#nbrLit').textContent).toContain(10);
    expect(compiled.querySelector('#nbrBob').textContent).toContain(5);
  }); 

  it('should NOT inject event data into HTML elements', () => {
    component.event = {
      nom: 'Bières entre potes',
      date: '2024-04-15',
      heure: '22:00',
      lieu: 'Rue du test unitaire',
      nbrLit: 10,
      nbrBob: 5
    };

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#event-name').textContent).not.toContain('Crémaillère de Mathilde');
    expect(compiled.querySelector('#date-time').textContent).not.toContain('2024-05-22 à 12:00');
    expect(compiled.querySelector('#location').textContent).not.toContain('Rue du chameau');
    expect(compiled.querySelector('#nbrLit').textContent).not.toContain(18);
    expect(compiled.querySelector('#nbrBob').textContent).not.toContain(2);
  }); 

  it('should get the data of the event based on its id from API', () => {
    const eventData = [{
      id: 1,
      nom: 'Bières entre potes',
      date: '2024-04-15',
      heure: '22:00',
      lieu: 'Rue du test unitaire',
      nbrLit: 10,
      nbrBob: 5
    }];

    const httpClientSpy = spyOn(component.http, 'get').and.returnValue(of(eventData));

    fixture.detectChanges();

    expect(httpClientSpy).toHaveBeenCalledWith('http://localhost:64000/events/1');
    expect(component.event).toEqual(eventData);
  });

  it('should NOT get the data of the event based on its id from API', () => {
    const eventData = [{
      id: 1,
      nom: 'Bières entre potes',
      date: '2024-04-15',
      heure: '22:00',
      lieu: 'Rue du test unitaire',
      nbrLit: 10,
      nbrBob: 5
    }];

    const httpClientSpy = spyOn(component.http, 'get').and.returnValue(of(eventData));

    fixture.detectChanges();

    expect(httpClientSpy).not.toHaveBeenCalledWith('http://localhost:64000/events/2');
    expect(component.event).toEqual(eventData);
  });

  it('should return the correct image URL for a given role', () => {
    const role = 'bob';
    const imageUrl = component.getImageUrl(role);
    expect(imageUrl).toEqual(`./assets/role/${role}.png`);
  });

  it('should return the correct image URL for a given role', () => {
    const role = 'lit_dispo';
    const imageUrl = component.getImageUrl(role);
    expect(imageUrl).toEqual(`./assets/role/${role}.png`);
  });

  it('should return the correct image URL for a given role', () => {
    const role = 'hote';
    const imageUrl = component.getImageUrl(role);
    expect(imageUrl).toEqual(`./assets/role/${role}.png`);
  });

  it('should return the correct image URL for a given role', () => {
    const role = 'place_voiture';
    const imageUrl = component.getImageUrl(role);
    expect(imageUrl).toEqual(`./assets/role/${role}.png`);
  });

  it('should return the correct image URL for a given role', () => {
    const role = 'covoiturage';
    const imageUrl = component.getImageUrl(role);
    expect(imageUrl).toEqual(`./assets/role/${role}.png`);
  });
});