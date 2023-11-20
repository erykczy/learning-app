import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-letters-menu',
  templateUrl: './letters-menu.component.html',
  styleUrls: ['./letters-menu.component.css']
})
export class LettersMenuComponent implements OnInit {
  @ViewChild('menu') menuDiv: ElementRef;
  @Input() x: number = 0;
  @Input() y: number = 0;
  realX: number = 0;
  realY: number = 0;
  shiftEnabled: boolean = false;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const menu: HTMLElement = this.element.nativeElement.querySelector('.menu');
    this.realX = this.x;
    this.realY = this.y - menu.getBoundingClientRect().height;
  }

  onShiftButtonClicked() {
    this.shiftEnabled = !this.shiftEnabled;
  }
  onLetterButtonClicked(event: MouseEvent, letter: string) {
    const activeElement = document.activeElement;
    if(activeElement instanceof HTMLInputElement === false) return;
    const input = <HTMLInputElement>activeElement;
    const sel = input.selectionStart;
    input.value = input.value.slice(0, sel) + letter + input.value.slice(input.selectionEnd, input.value.length);
    input.dispatchEvent(new Event('input'));
    input.selectionStart = sel + 1;
    input.selectionEnd = sel + 1;

    event.preventDefault();
  }

  getA(): string {
    return this.shiftEnabled ? 'Ä' : 'ä';
  }
  getO(): string {
    return this.shiftEnabled ? 'Ö' : 'ö';
  }
  getU(): string {
    return this.shiftEnabled ? 'Ü' : 'ü';
  }
  getS(): string {
    return this.shiftEnabled ? 'ẞ' : 'ß';
  }
}
