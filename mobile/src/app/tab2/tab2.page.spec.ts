import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Tab2Page } from './tab2.page';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab2Page],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format date correctly when creating event', () => {
    const eventDateTime = '2024-04-23T12:00:00Z'; // Simulate user input
    const expectedDate = '23/04/2024'; // Expected formatted date

    // Simulate datetime change
    component.onDateTimeChange({ detail: { value: eventDateTime } } as CustomEvent);

    // Simulate event creation
    component.creationEvent();

    // Expect HTTP request to be made with correct event data
    const req = httpMock.expectOne('http://localhost:64000/events');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.date).toEqual(expectedDate);
    
    // Respond to the request
    req.flush({}); // Mock response

    // Verify that navigation occurs
    expect(component.router.navigateByUrl).toHaveBeenCalledWith(`/tabs/tab1`);
  });

  afterEach(() => {
    httpMock.verify();
  });
});