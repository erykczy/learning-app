import { Directive, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomLetters]',
  host: {
    '[class.custom-letters]': 'true'
  }
})
export class CustomLettersDirective {
  constructor() {

  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent) {
    if(event.relatedTarget instanceof HTMLElement === false) return;
    if(event.target instanceof HTMLElement === false) return;
    const relatedTarget = <HTMLElement>event.relatedTarget;
    const target = <HTMLElement>event.target;

    const classList = relatedTarget.classList;
    if(classList.contains('letter-button') || classList.contains('shift-button'))
      target.focus();
  }

  @HostListener("change")
  onChanged() {

  }
}
