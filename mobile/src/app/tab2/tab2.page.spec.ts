import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tab2Page } from './tab2.page';
import { By } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab2Page],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule,HttpClientModule,HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize eventData with default values', () => {
    expect(component.eventData).toEqual({
      id: 0,
      nom: "",
      heure: "",
      date: new Date().toISOString().slice(0, 10),
      lieu: "",
      nbrLit: 0,
      nbrBob: 0
    });
  });


  it("should send eventData when creationEvent is called but if the information 'nom' is missing there is an error and the event isn't created", () => {
    const mockResponse = {
      "statusCode": 500,
      "message": "Internal server error"
    };

    spyOn(component.http, 'post').and.returnValue(of(mockResponse));
  
    component.eventData = {
      id: 2,
      nom: '',
      heure: '12:00',
      date: '',
      lieu: 'Test Location',
      nbrLit: 10,
      nbrBob: 5
    };
  
    component.creationEvent();
  
    expect(component.http.post).toHaveBeenCalledWith(
      'http://localhost:64000/events',
      component.newEvent  
    );
  });

  it("should send eventData when creationEvent is called but if the information 'heure' is missing there is an error and the event isn't created", () => {
    const mockResponse = {
      "statusCode": 500,
      "message": "Internal server error"
    };

    spyOn(component.http, 'post').and.returnValue(of(mockResponse));
  
    component.eventData = {
      id: 2,
      nom: 'Testeuh',
      heure: '',
      date: '2024-04-15',
      lieu: 'Test Location',
      nbrLit: 10,
      nbrBob: 5
    };
  
    component.creationEvent();
  
    expect(component.http.post).toHaveBeenCalledWith(
      //'http://localhost:64000/events',
      `${environment.api}/events`,
      component.newEvent  
    );
  });

  it("should send eventData when creationEvent is called but if the information 'date' is missing there is an error and the event isn't created", () => {
    const mockResponse = {
      "statusCode": 500,
      "message": "Internal server error"
    };

    spyOn(component.http, 'post').and.returnValue(of(mockResponse));
  
    component.eventData = {
      id: 2,
      nom: 'Test Event',
      heure: '12:00',
      date: '',
      lieu: 'Test Location',
      nbrLit: 10,
      nbrBob: 5
    };
  
    component.creationEvent();
  
    expect(component.http.post).toHaveBeenCalledWith(
      'http://localhost:64000/events',
      component.newEvent  
    );
  });

  it("should send eventData when creationEvent is called but if the information 'lieu' is missing there is an error and the event isn't created", () => {
    const mockResponse = {
      "statusCode": 500,
      "message": "Internal server error"
    };

    spyOn(component.http, 'post').and.returnValue(of(mockResponse));
  
    component.eventData = {
      id: 2,
      nom: 'Test Event',
      heure: '12:00',
      date: '2024-04-15',
      lieu: '',
      nbrLit: 10,
      nbrBob: 5
    };
  
    component.creationEvent();
  
    expect(component.http.post).toHaveBeenCalledWith(
      'http://localhost:64000/events',
      component.newEvent  
    );
  });


  it('should send eventData when creationEvent is called', () => {
    const mockResponse = {  id: 2,
      nom: 'Test Event',
      heure: '12:00',
      date: '2024-04-15',
      lieu: 'Test Location',
      nbrLit: 10,
      nbrBob: 5 };

    spyOn(component.http, 'post').and.returnValue(of(mockResponse));
  
    component.eventData = {
      id: 2,
      nom: 'Test Event',
      heure: '12:00',
      date: '2024-04-15',
      lieu: 'Test Location',
      nbrLit: 10,
      nbrBob: 5
    };
  
    component.creationEvent();
  
    expect(component.http.post).toHaveBeenCalledWith(
      'http://localhost:64000/events',
      component.newEvent  
    );
  });

  it("should clear errorMessage when valid number is entered after error", () => {
    component.eventData.nbrLit = 15;
    component.creationEvent(); 
    expect(component.errorMessage).toBe("Le nombre de lits ne peut pas dépasser 10");
    component.eventData.nbrLit = 5;
    component.creationEvent(); 
    expect(component.errorMessage).toBe('');
});
  
  /*it('should initialize and update the event name input field', () => {
    const inputElement = fixture.debugElement.query(By.css('ion-input[label="Nom de l\'événement"] input'));
    expect(inputElement.nativeElement.value).toBe('');
  
    inputElement.nativeElement.value = 'Bière entre potes';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  
    expect(component.eventData.nom).toBe('Bière entre potes');
  });*/

  /*it('should call creationEvent method when form is submitted', () => {
    spyOn(component, 'creationEvent');
    
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));
    button.nativeElement.click();

    expect(component.creationEvent).toHaveBeenCalled();

  });*/
  


});