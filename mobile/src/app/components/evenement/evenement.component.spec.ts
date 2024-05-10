import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EvenementComponent } from './evenement.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ManageEventService } from 'src/app/services/manage-event.service';
import { UpdateEventComponent } from '../update-event/update-event.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

describe('EvenementComponent', () => {
  let component: EvenementComponent;
  let fixture: ComponentFixture<EvenementComponent>;

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
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});

describe('Unit tests', () => {
  let component: EvenementComponent;
  let fixture: ComponentFixture<EvenementComponent>;
  let activatedRoute: ActivatedRoute;
  let manageEventService: ManageEventService;

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
        },
        ManageEventService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });
  
  it('should inject event data into HTML elements', () => {
    component.event = {
      id: 1,
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
      id: 1,
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
    const mockEventData = [{
      id: 1,
      nom: 'Bières entre potes',
      date: '2024-04-15',
      heure: '22:00',
      lieu: 'Rue du test unitaire',
      nbrLit: 10,
      nbrBob: 5
    }];

    const httpClientSpy = spyOn(component.http, 'get').and.returnValue(of(mockEventData));

    fixture.detectChanges();

    expect(httpClientSpy).toHaveBeenCalledWith('https://iziplan.l2-1.ephec-ti.be:64000/events/1');
    expect(component.event).toEqual(mockEventData);
  });

  it('should NOT get the data of the event based on its id from API', () => {
    const mockEventData = [{
      id: 1,
      nom: 'Bières entre potes',
      date: '2024-04-15',
      heure: '22:00',
      lieu: 'Rue du test unitaire',
      nbrLit: 10,
      nbrBob: 5
    }];

    const httpClientSpy = spyOn(component.http, 'get').and.returnValue(of(mockEventData));

    fixture.detectChanges();

    expect(httpClientSpy).not.toHaveBeenCalledWith('https://iziplan.l2-1.ephec-ti.be:64000/events/2');
    expect(component.event).toEqual(mockEventData);
  });

  it('should load event infos on ngOnInit', () => {
    spyOn(component, 'loadEventInfos');
    component.ngOnInit();
    expect(component.loadEventInfos).toHaveBeenCalled();
  });

  it('should refresh event infos and complete the eventInfos target', () => {
    const eventInfosMock = { target: { complete: jasmine.createSpy('complete') } };
    spyOn(component, 'loadEventInfos');
    component.refreshEventInfos(eventInfosMock);
    expect(component.loadEventInfos).toHaveBeenCalled();
    setTimeout(() => {
      expect(eventInfosMock.target.complete).toHaveBeenCalled();
    }, 2000);
  });

});

describe('Unit tests : role', () => {
  let component: EvenementComponent;
  let fixture: ComponentFixture<EvenementComponent>;

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
        },
        ManageEventService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementComponent);
    component = fixture.componentInstance;
  });
  
  it('should return the correct image URL for a given role', () => {
    const role = 'Bob';
    const imageUrl = component.getImageUrl(role);
    expect(imageUrl).toEqual(`./assets/role/${role}.png`);
  });

  it('should return the correct image URL for a given role', () => {
    const role = 'Lit';
    const imageUrl = component.getImageUrl(role);
    expect(imageUrl).toEqual(`./assets/role/${role}.png`);
  });

  it('should return the correct image URL for a given role', () => {
    const role = 'hote';
    const imageUrl = component.getImageUrl(role);
    expect(imageUrl).toEqual(`./assets/role/${role}.png`);
  });

  it('should return the correct image URL for a given role', () => {
    const role = 'placevoiture';
    const imageUrl = component.getImageUrl(role);
    expect(imageUrl).toEqual(`./assets/role/${role}.png`);
  });

  it('should return the correct image URL for a given role', () => {
    const role = 'covoiturage';
    const imageUrl = component.getImageUrl(role);
    expect(imageUrl).toEqual(`./assets/role/${role}.png`);
  });

  it('should return the correct image URL for a given role', () => {
    const role = 'Admin';
    const imageUrl = component.getImageUrl(role);
    expect(imageUrl).toEqual(`./assets/role/${role}.png`);
  });

  it('should throw an error for a role with special characters', () => {
    const role = '@#$%';
    expect(() => component.getImageUrl(role)).toThrowError('Le statut est invalide.');
  });

  it('should throw an error for a role with numbers', () => {
    const role = 'role123';
    expect(() => component.getImageUrl(role)).toThrowError('Le statut est invalide.');
  });
});

describe('Integration tests between UpdateEventComponent and EvenementComponent', () => {
  let updateComponent: UpdateEventComponent;
  let evenementComponent: EvenementComponent;
  let updateFixture: ComponentFixture<UpdateEventComponent>;
  let evenementFixture: ComponentFixture<EvenementComponent>;
  let manageEventService: ManageEventService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEventComponent, EvenementComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ManageEventService]
    }).compileComponents();

    manageEventService = TestBed.inject(ManageEventService);
  }));

  beforeEach(() => {
    updateFixture = TestBed.createComponent(UpdateEventComponent);
    updateComponent = updateFixture.componentInstance;

    evenementFixture = TestBed.createComponent(EvenementComponent);
    evenementComponent = evenementFixture.componentInstance;

    updateFixture.detectChanges();
    evenementFixture.detectChanges();
  });

  it('should update event details in EvenementComponent after updating in UpdateEventComponent', () => {
    const mockEventData = { 
      id: 1, 
      nom: 'Bières entre potes', 
      date: '2024-04-15', 
      heure: '22:00', 
      lieu: 'Rue du test unitaire', 
      nbrLit: 10, 
      nbrBob: 5 
    };

    updateComponent.event = { ...mockEventData };

    expect(updateComponent.event.nom).toEqual('Bières entre potes');

    updateComponent.event.nom = 'Crémaillère de Mathilde';
    updateComponent.updateEvent();

    updateFixture.detectChanges();

    expect(evenementComponent.event.nom).toEqual('Crémaillère de Mathilde');
  });

  it('should update event details in EvenementComponent after updating in UpdateEventComponent', () => {
    const mockEventData = { 
      id: 1, 
      nom: 'Bières entre potes', 
      date: '2024-04-15', 
      heure: '22:00', 
      lieu: 'Rue du test unitaire', 
      nbrLit: 10, 
      nbrBob: 5 
    };

    updateComponent.event = { ...mockEventData };

    expect(updateComponent.event.nom).toEqual('Bières entre potes');

    updateComponent.event.nom = 'Crémaillère de Mathilde';
    updateComponent.updateEvent();

    updateFixture.detectChanges();

    expect(evenementComponent.event.nom).not.toEqual('Bières entres potes');
  });
});