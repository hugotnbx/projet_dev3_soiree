import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EvenementComponent } from './evenement.component';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('EvenementComponent', () => {
  let component: EvenementComponent;
  let fixture: ComponentFixture<EvenementComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EvenementComponent],
      imports: [IonicModule.forRoot(), HttpClientModule, RouterModule.forRoot([]), RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'test_id'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EvenementComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should navigate to update page with event ID when button is clicked', () => {
    component.event = {
      id: 1, 
      nom: 'Test',
      date: '2024-04-15',
      heure: '22:00',
      lieu: 'Rue du test unitaire',
      nbrLit: 10,
      nbrBob: 5
    }

    const navigateSpy = spyOn(router, 'navigateByUrl');

    const button = fixture.debugElement.query(By.css('ion-button')).nativeElement;
    button.click();

    expect(navigateSpy).toHaveBeenCalledWith(`/update-event/${component.event.id}`);
  }); */
  
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
});