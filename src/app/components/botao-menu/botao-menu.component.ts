import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botao-menu',
  // imports: [],
  standalone: true,
  templateUrl: './botao-menu.component.html',
  styleUrl: './botao-menu.component.scss'
})
export class BotaoMenuComponent {

  @Input()
  descricao: string = '';

  @Input()
  selecionado: boolean = false;

  @Output()
  clickButton: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  onClick(): void {
    this.clickButton.emit();
  }
}
