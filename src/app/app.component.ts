import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'learning-app';
  contextMenuOpened: boolean = false;
  contextMenuPos: {x: number, y: number} = {x: 0, y: 0};

  @HostListener('window:contextmenu', ['$event'])
  onContextMenu(event: PointerEvent) {
    if(event.target instanceof HTMLElement === false) return;
    const target = <HTMLElement>event.target;
    if(target.classList.contains('custom-letters') === false) return;

    this.contextMenuOpened = true;
    this.contextMenuPos = {x: event.x, y: target.getBoundingClientRect().y};
    event.preventDefault();
  }

  @HostListener('window:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if(event.target instanceof HTMLElement === false) return;
    const target = (<HTMLElement>event.target);

    if(target.closest('app-letters-menu') === null)
      this.contextMenuOpened = false;
  }
}
