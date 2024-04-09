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

  it('should return correct image URL based on role', () => {
    // Test pour le rôle 'admin'
    expect(component.getImageUrl('admin')).toEqual('./assets/role/admin.png');

    // Test pour le rôle 'Bob'
    expect(component.getImageUrl('Bob')).toEqual('./assets/role/bob.png');

    // Test pour le rôle 'place_voiture'
    expect(component.getImageUrl('place_voiture')).toEqual('./assets/role/place_voiture.png');

    // Test pour le rôle 'hote'
    expect(component.getImageUrl('hote')).toEqual('./assets/role/hote.png');

    // Test pour le rôle 'lit_dispo'
    expect(component.getImageUrl('lit_dispo')).toEqual('./assets/role/lit.png');

    // Test pour le rôle 'covoiturage'
    expect(component.getImageUrl('covoiturage')).toEqual('./assets/role/covoiturage.png');

    // Test pour un rôle non reconnu
    expect(component.getImageUrl('autre')).toEqual('./assets/role/pas_de_role.png');
  });
});