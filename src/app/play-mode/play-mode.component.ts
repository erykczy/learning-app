import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { PlayModeState } from './play-mode-state.enum';
import { StorageService } from '../shared/storage.service';
import { Concept } from '../shared/concept';

const maxLeft: number = 5;

@Component({
  selector: 'app-play-mode',
  templateUrl: './play-mode.component.html',
  styleUrls: ['./play-mode.component.css']
})
export class PlayModeComponent implements OnInit {
  conceptsRef: Concept[];
  conceptsLeft: Concept[] = [];
  index: number;
  currentState: PlayModeState;
  input: string;
  outCorrectAnswer: string;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    // TODO temporary, to remove
    setTimeout(() => {
      this.onInit();
    }, 5);
  }

  onInit() {
    this.start();
  }

  start() {
    // set up variables
    this.currentState = PlayModeState.Answering;
    this.conceptsRef = this.storageService.getConcepts();
    this.conceptsLeft = this.conceptsRef.slice(0, maxLeft);
    this.index = maxLeft - 1;
    this.input = '';
  }

  restart() {
    this.start();
  }

  next() {
    switch(this.currentState) {
      case PlayModeState.Done:
        this.restart();
        break;
      case PlayModeState.Answering:
        this.showAnswer();
        break;
      case PlayModeState.Correct:
      case PlayModeState.Incorrect:
        this.showNewConcept();
        break;
    }
  }

  showNewConcept() {
    // remove current concept from concepts left
    this.conceptsLeft.splice(0, 1);

    if(this.currentState === PlayModeState.Incorrect) {
      // push removed concept to the end of list
      this.conceptsLeft.push(this.getCurrentConcept());
    }
    if(this.currentState === PlayModeState.Correct) {
      // update concepts left
      this.index++;
      if(this.index < this.conceptsRef.length)
        this.conceptsLeft.push(this.conceptsRef[this.index]);

      // victory
      if(this.conceptsLeft.length === 0) {
        this.currentState = PlayModeState.Done;
        return;
      }
    }

    // clear input
    this.input = '';

    // update state
    this.currentState = PlayModeState.Answering;
  }

  showAnswer() {
    this.outCorrectAnswer = this.getCurrentConcept().value;
    if(this.input === this.outCorrectAnswer) {
      this.currentState = PlayModeState.Correct;
    }
    else {
      this.currentState = PlayModeState.Incorrect;
    }
  }

  onAcceptAnswer() {
    this.currentState = PlayModeState.Correct;
  }

  getCurrentConcept(): Concept {
    return this.conceptsLeft[0];
  }

  isAnswering(): boolean {
    return this.currentState === PlayModeState.Answering;
  }
  isDone(): boolean {
    return this.currentState === PlayModeState.Done;
  }
  shouldShowCorrect(): boolean {
    return this.currentState === PlayModeState.Correct || this.currentState === PlayModeState.Incorrect;
  }
  shouldShowIncorrect(): boolean {
    return this.currentState === PlayModeState.Incorrect;
  }
}
