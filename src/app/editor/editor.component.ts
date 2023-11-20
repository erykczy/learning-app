import { AfterViewInit, Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { Concept } from '../shared/concept';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  concepts: Concept[] = [];

  constructor(private storageService: StorageService, private router: Router, private activedRoute: ActivatedRoute) {

  }
  ngOnInit() {
    this.loadConcepts();
  }

  /*`
  @HostListener('window:load')
  onWindowLoad(): void {
    this.loadConcepts();
  }

  ngOnInit() {
    this.activedRoute.params.subscribe((params) => {
      this.loadConcepts();
      console.log("aAAA");
    })
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart)
        this.loadConcepts();
    })
  }
  */

  loadConcepts() {
    this.concepts = this.storageService.getConcepts();
  }
  saveConcepts() {
    this.storageService.saveConcepts(this.concepts);
  }

  onInput() {
    this.saveConcepts();
  }
  onAddConcept() {
    this.concepts.push(new Concept('', ''));
    this.saveConcepts();
  }
  onRemoveConcept(index: number) {
    this.concepts.splice(index, 1);
    this.saveConcepts();
  }
}
