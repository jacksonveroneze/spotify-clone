import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-botao-menu',
  imports: [],
  templateUrl: './botao-menu.component.html',
  styleUrl: './botao-menu.component.scss'
})
export class BotaoMenuComponent implements OnInit {

  @Input()
  descricao: string = ''

  @Input()
  selecionado: boolean = false;

  @Output()
  click: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  onClick(): void {
    this.click.emit();
  }

}
