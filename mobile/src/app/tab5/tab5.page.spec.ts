import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { Tab5Page } from './tab5.page';

describe('TabPastEventsPage', () => {
  let component: Tab5Page;
  let fixture: ComponentFixture<Tab5Page>;
  let httpMock : HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab5Page ],
      imports: [IonicModule.forRoot(),HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab5Page);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Fonction DatePlusPetit True', () => {
    const date1 = new Date(2024, 3, 15, 0, 0);
    const date2 = new Date(2024, 5, 20, 0, 0);
    const resultTrue = component.datePlusPetite(date1, date2);
    expect(resultTrue).toBeTruthy();
  });

  it('Fonction DatePlusPetit False', () => {
    const date3 = new Date(2024, 3, 15, 0, 0);
    const date4 = new Date(2024, 5, 20, 0, 0);
    const resultFalse = component.datePlusPetite(date4, date3);
    expect(resultFalse).toBeFalsy();
  });

  it ('date des events type date', () => {
    
  });
});
