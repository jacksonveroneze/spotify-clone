import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

  @Input()
  imagemUrl:string = '';

  @Input()
  text:string = '';
}
