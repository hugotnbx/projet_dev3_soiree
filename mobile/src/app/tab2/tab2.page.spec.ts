import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, PopoverController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tab2Page } from './tab2.page';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../services/local-storage.service';
import { ManageEventService } from '../services/manage-event.service';

class LocalStorageServiceMock {
  getItem(key: string): string | null {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.sflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  }
}

class ManageEventServiceMock {
  shareNewEvent(event: any) {}
}

class PopoverControllerMock {
  create(options: any) {
    return {
      present: () => Promise.resolve(),
      onDidDismiss: () => Promise.resolve({ data: [] }),
    };
  }
}

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;
  let localStorageService: LocalStorageServiceMock;
  let manageEventService: ManageEventServiceMock;
  let popoverController: PopoverControllerMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab2Page],
      imports: [
        IonicModule.forRoot(),
        ExploreContainerComponentModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: LocalStorageService, useClass: LocalStorageServiceMock },
        { provide: ManageEventService, useClass: ManageEventServiceMock },
        { provide: PopoverController, useClass: PopoverControllerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct userId', () => {
    expect(component.userId.username).toBe('testuser');
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
      `${environment.api}/events`,
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
      `${environment.api}/events`,
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
      `${environment.api}/events`,
      component.newEvent  
    );
  });

  it('should send eventData when creationEvent is called', () => {
    const mockResponse = {  
      id: 2,
      nom: 'Test Event',
      heure: '12:00',
      date: '2024-04-15',
      lieu: 'Test Location',
      nbrLit: 10,
      nbrBob: 5 
    };

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
      `${environment.api}/events`,
      component.newEvent  
    );
  });

  it("should clear errorMessage when valid number is entered after error", () => {
    component.eventData.nbrLit = 15;
    component.creationEvent(); 
    expect(component.errorMessage).toBe("Vous ne pouvez pas proposer plus de 10 lits");
    component.eventData.nbrLit = 5;
    component.creationEvent(); 
    expect(component.errorMessage).toBe('');
  });

  it('should return false for isNumAndPositive with a negative number', () => {
    const result = component.isNumAndPositive(-1);
    expect(result).toBe(true);
  });

  it('should return false for isNumAndPositive with a non-numeric value', () => {
    const result = component.isNumAndPositive('abc');
    expect(result).toBe(true);
  });

  it('should return true for isNumAndPositive with a positive number', () => {
    const result = component.isNumAndPositive(1);
    expect(result).toBe(false);
  });

  it('should update eventDateTime, eventData.date, and eventData.heure on date time change', () => {
    const mockEvent = {
    detail: {
    value: '2024-05-20T14:30:00.000Z'
    }
    } as CustomEvent;
    
    component.onDateTimeChange(mockEvent);
    
    expect(component.eventDateTime).toBe('2024-05-20T14:30:00.000Z');
    
    const dateTime = new Date('2024-05-20T14:30:00.000Z');
    const date = dateTime.toLocaleDateString('fr-CA');
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    expect(component.eventData.date).toBe(date);
    expect(component.eventData.heure).toBe(time);
  });
});
