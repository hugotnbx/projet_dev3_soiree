import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EvenementComponent } from './evenement.component';

describe('EvenementComponent', () => {
  let component: EvenementComponent;
  let fixture: ComponentFixture<EvenementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EvenementComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(EvenementComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return the correct image URL for a given role', () => {
    const role = 'admin';
    const imageUrl = component.getImageUrl(role);
    expect(imageUrl).toEqual(`./assets/role/${role}.png`);
  });

});