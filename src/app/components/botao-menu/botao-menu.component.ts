import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-botao-menu',
  // imports: [],
  standalone: false,
  templateUrl: './botao-menu.component.html',
  styleUrl: './botao-menu.component.scss'
})
export class BotaoMenuComponent {

  @Input()
  descricao: string = ''

  @Input()
  selecionado: boolean = false;

  @Output()
  click: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  onClick(): void {
    this.click.emit();
  }
}
