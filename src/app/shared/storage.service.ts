import { Injectable } from '@angular/core';
import { Concept } from './concept';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  getConcepts(): Concept[] | null {
    if(localStorage.getItem('concepts') === null) return null;
    return JSON.parse(localStorage.getItem('concepts'));
  }
  saveConcepts(concepts: Concept[]) {
    localStorage.setItem('concepts', JSON.stringify(concepts));
  }
}
