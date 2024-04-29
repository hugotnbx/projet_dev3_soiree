import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Profil } from '../interfaces/profil';

@Injectable({
  providedIn: 'root',
})

export class ManageUserService {
    private updatedProfilSubject = new Subject<Profil>();

    updatedProfil$ = this.updatedProfilSubject.asObservable();

    shareUpdatedProfil(updatedProfil: Profil){
      this.updatedProfilSubject.next(updatedProfil);
    }
}