import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CreationProfilComponent } from './creation-profil.component';

describe('CreationProfilComponent', () => {
  let component: CreationProfilComponent;
  let fixture: ComponentFixture<CreationProfilComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationProfilComponent ],
      imports: [IonicModule.forRoot(),HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CreationProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
