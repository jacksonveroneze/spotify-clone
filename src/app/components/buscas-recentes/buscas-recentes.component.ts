import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-buscas-recentes',
  imports: [
    FormsModule
  ],
  templateUrl: './buscas-recentes.component.html',
  styleUrl: './buscas-recentes.component.scss'
})
export class BuscasRecentesComponent {

  pesquisasRecentes: string[] = [
    'Top Brasil', 'Top Global', 'Esquenta Sertanejo',
    'Funk Hits', 'Pagodeira'
  ]

  campoPesquisa: string = '';

  buscar(): void {
    console.log('Buscando...', this.campoPesquisa);
  }

  definirPesquisa(pesquisa: string) {
    this.campoPesquisa = pesquisa;
  }
}
