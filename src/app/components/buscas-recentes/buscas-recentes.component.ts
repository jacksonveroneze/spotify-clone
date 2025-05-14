import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-buscas-recentes',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './buscas-recentes.component.html',
  styleUrl: './buscas-recentes.component.scss'
})
export class BuscasRecentesComponent implements OnInit {

  pesquisasRecentes: string[] = [
    'Top Brasil', 'Top Global', 'Esquenta Sertanejo',
    'Funk Hits', 'Pagodeira'
  ]

  form: FormGroup = new FormGroup({});

  campoPesquisa: string = '';

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      busca: ['', Validators.required],
    })
  }

  buscar(): void {
    console.log('Buscando...', this.form.get('busca').value);
  }

  definirPesquisa(pesquisa: string) {
    this.campoPesquisa = pesquisa;
  }
}
