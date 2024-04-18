import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateEventComponent } from './update-event.component';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';


describe('UpdateEventComponent', () => {
  let component: UpdateEventComponent;
  let fixture: ComponentFixture<UpdateEventComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(waitForAsync(() => {
    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: () => '1'
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [UpdateEventComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateEventComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    // Mock the HTTP request
    const event = {
      id: 1,
      nom: 'Test Event',
      heure: '10:00',
      date: '2024-04-13',
      lieu: 'Test Location',
      nbrLit: 5,
      nbrBob: 3
    };
    const req = httpTestingController.expectOne('http://localhost:64000/events/1');
    expect(req.request.method).toEqual('GET');
    req.flush(event);

    fixture.detectChanges();
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate event details from API', () => {
    expect(component.event).toEqual({
      id: 1,
      nom: 'Test Event',
      heure: '10:00',
      date: '2024-04-13',
      lieu: 'Test Location',
      nbrLit: 5,
      nbrBob: 3
    });
  });


  it('should navigate to home page after successful update', fakeAsync(() => {
    const updatedEvent = {
      id: 1,
      nom: 'Updated Test Event',
      heure: '11:00',
      date: '2024-04-14',
      lieu: 'Updated Test Location',
      nbrLit: 10,
      nbrBob: 6
    };

    component.event = updatedEvent;

    const navigateSpy = spyOn(router, 'navigate').and.callThrough();
    const putSpy = spyOn(httpClient, 'put').and.returnValue(of({}));

    component.updateEvent();
    tick();

    expect(navigateSpy).toHaveBeenCalledWith(['']);


  }));





  it('Ne modifie pas un evenement si le nom est trop long', fakeAsync(() => {
    const updatedEvent = {
      id: 1,
      nom: 'This is a very long event name that exceeds the maximum allowed length',
      heure: '11:00',
      date: '2024-04-14',
      lieu: 'Updated Test Location',
      nbrLit: 10,
      nbrBob: 6
    };
  
    component.event = updatedEvent;
  
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();
    const putSpy = spyOn(httpClient, 'put').and.returnValue(of({}));
  
    
    const consoleLogSpy = spyOn(console, 'log');
  
    component.updateEvent();
    tick();
  
    expect(putSpy).not.toHaveBeenCalled(); 
    expect(navigateSpy).not.toHaveBeenCalled(); 
  
    
    expect(consoleLogSpy).toHaveBeenCalledWith("Le nom est trop long");
  }));
  
  it('Ne doit pas modifier levenement si le lieu est vide', fakeAsync(() => {
    const updatedEvent = {
      id: 1,
      nom: 'Updated Test Event',
      heure: '11:00',
      date: '2024-04-14',
      lieu: '', 
      nbrLit: 10,
      nbrBob: 6
    };
  
    component.event = updatedEvent;
  
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();
    const putSpy = spyOn(httpClient, 'put').and.returnValue(of({}));
    const consoleLogSpy = spyOn(console, 'log');
    component.updateEvent();
    tick();
  
    expect(putSpy).not.toHaveBeenCalled(); 
    expect(navigateSpy).not.toHaveBeenCalled(); 
    expect(consoleLogSpy).toHaveBeenCalledWith("Lieu invalide");
  }));
  
  it('ne modifie pas levenement si le nom est vide', fakeAsync(() => {
    const updatedEvent = {
      id: 1,
      nom: '', 
      heure: '11:00',
      date: '2024-04-14',
      lieu: 'Updated Test Location',
      nbrLit: 10,
      nbrBob: 6
    };
  
    component.event = updatedEvent;
  
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();
    const putSpy = spyOn(httpClient, 'put').and.returnValue(of({}));
    const consoleLogSpy = spyOn(console, 'log');
  
    component.updateEvent();
    tick();
  
    expect(putSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled(); 
    expect(consoleLogSpy).toHaveBeenCalledWith("Le nom est vide");
  }));
  
  it('ne modifie pas levenement si lheure est au mauvais format', fakeAsync(() => {
    const updatedEvent = {
      id: 1,
      nom: 'Updated Test Event',
      heure: '11:000', 
      date: '2024-04-14',
      lieu: 'Updated Test Location',
      nbrLit: 10,
      nbrBob: 6
    };
  
    component.event = updatedEvent;
  
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();
    const putSpy = spyOn(httpClient, 'put').and.returnValue(of({}));
    const consoleLogSpy = spyOn(console, 'log');
  
    component.updateEvent();
    tick();
  
    expect(putSpy).not.toHaveBeenCalled(); 
    expect(navigateSpy).not.toHaveBeenCalled(); 
    expect(consoleLogSpy).toHaveBeenCalledWith("Format d'heure invalide");
  }));
  
  it('nombre de lit invalide ', fakeAsync(() => {
    const updatedEvent = {
      id: 1,
      nom: 'Updated Test Event',
      heure: '11:00',
      date: '2024-04-14',
      lieu: 'Updated Test Location',
      nbrLit: -1, 
      nbrBob: 6
    };
  
    component.event = updatedEvent;
  
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();
    const putSpy = spyOn(httpClient, 'put').and.returnValue(of({}));
    const consoleLogSpy = spyOn(console, 'log');
  
    component.updateEvent();
    tick();
  
    expect(putSpy).not.toHaveBeenCalled(); 
    expect(navigateSpy).not.toHaveBeenCalled(); 
    expect(consoleLogSpy).toHaveBeenCalledWith("Nombre de lits invalide");
  }));
  
  it('nombre de bob invalide donc event pas modifier', fakeAsync(() => {
    const updatedEvent = {
      id: 1,
      nom: 'Updated Test Event',
      heure: '11:00',
      date: '2024-04-14',
      lieu: 'Updated Test Location',
      nbrLit: 10,
      nbrBob: 100 
    };
  
    component.event = updatedEvent;
  
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();
    const putSpy = spyOn(httpClient, 'put').and.returnValue(of({}));
    const consoleLogSpy = spyOn(console, 'log');
  
    component.updateEvent();
    tick();
  
    expect(putSpy).not.toHaveBeenCalled(); 
    expect(navigateSpy).not.toHaveBeenCalled(); 
    expect(consoleLogSpy).toHaveBeenCalledWith("Nombre de bobs invalide");
  }));
  
  it('location avec caractere speciaux', fakeAsync(() => {
    const updatedEvent = {
      id: 1,
      nom: 'Updated Test Event',
      heure: '11:00',
      date: '2024-04-14',
      lieu: 'Location with special characters !@#$',
      nbrLit: 10,
      nbrBob: 6
    };
  
    component.event = updatedEvent;
  
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();
    const putSpy = spyOn(httpClient, 'put').and.returnValue(of({}));
    const consoleLogSpy = spyOn(console, 'log');
  
    component.updateEvent();
    tick();
  
    expect(putSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled(); 
    expect(consoleLogSpy).toHaveBeenCalledWith("Lieu invalide");
  }));
  it('heure mal former', fakeAsync(() => {
    const updatedEvent = {
      id: 1,
      nom: 'Updated Test Event',
      heure: '24:00', 
      date: '2024-04-14',
      lieu: 'Updated Test Location',
      nbrLit: 10,
      nbrBob: 6
    };
  
    component.event = updatedEvent;
  
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();
    const putSpy = spyOn(httpClient, 'put').and.returnValue(of({}));
    const consoleLogSpy = spyOn(console, 'log');
  
    component.updateEvent();
    tick();
  
    expect(putSpy).not.toHaveBeenCalled(); 
    expect(navigateSpy).not.toHaveBeenCalled(); 
    expect(consoleLogSpy).toHaveBeenCalledWith("Format d'heure invalide");
  }));
  
  
 
});
