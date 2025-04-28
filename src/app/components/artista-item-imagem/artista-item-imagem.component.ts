import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-artista-item-imagem',
  imports: [],
  templateUrl: './artista-item-imagem.component.html',
  styleUrl: './artista-item-imagem.component.scss'
})
export class ArtistaItemImagemComponent {

  @Input()
  imagem: string = '';

  @Output()
  clickEvent: EventEmitter<void> = new EventEmitter<void>();

  onCLick(): void {
    this.clickEvent.emit();
  }
}
