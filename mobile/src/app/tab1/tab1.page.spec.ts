/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1Page } from './tab1.page';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab1Page],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tab1Page } from './tab1.page';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1Page],
      imports: [IonicModule.forRoot(), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch event data from API', () => {
    const testData = [
      {
        "id": 37,
        "nom": "antony",
        "heure": "18:26",
        "date": "2024-04-27",
        "lieu": "dzd",
        "nbrLit": 0,
        "nbrBob": 0
      }
    ];

    component.readApi("http://localhost:64000/events").subscribe((data) => {
      expect(data).toEqual(testData);
      expect(component.events).toEqual(testData);
    });

    const req = httpTestingController.expectOne("http://localhost:64000/events");
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  /*it('should handle API error', () => {
    const errorResponse = { status: 404, statusText: 'Not Found' };

    component.readApi("http://localhost:64000/users/hugoneutre").subscribe(
      () => {},
      (error) => {
        expect(error).toEqual(errorResponse);
      }
    );

    const req = httpTestingController.expectOne("http://localhost:64000/users/hugoneutre");
    expect(req.request.method).toEqual('GET');
    req.flush(null, errorResponse);
  });*/
});
