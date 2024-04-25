import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { Tab1Page } from './tab1.page';

describe('TabEvent', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  let httpMock : HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab1Page ],
      imports: [IonicModule.forRoot(),HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Fonction DatePlusPetit True', () => {
    const date1 = new Date(2024, 5, 20, 0, 0);
    const date2 = new Date(2024, 3, 15, 0, 0);
    const resultTrue = component.datePlusGrand(date1, date2);
    expect(resultTrue).toBeTruthy();
  });

  it('Fonction DatePlusPetit False', () => {
    const date3 = new Date(2024, 5, 20, 0, 0);
    const date4 = new Date(2024, 3, 15, 0, 0);
    const resultFalse = component.datePlusGrand(date4, date3);
    expect(resultFalse).toBeFalsy();
  });
});
