import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }
  create(): Promise<any> {
    return this.storage.create();
  }

  set(key: string, value: any): Promise<any> {
    return this.storage.set(key, value);
  }

  get(key: string): Promise<any> {
    return this.storage.get(key);
  }

  clear(): Promise<any>{
    return this.storage.clear();
  }

  remove(key: string): Promise<any> {
    return this.storage.remove(key);
  }
}