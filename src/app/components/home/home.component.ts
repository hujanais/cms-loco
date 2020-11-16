import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  private _selectedLanguage = 'en';

  constructor(private translocoService: TranslocoService) { }

  set selectedLanguage(value: string) {
    this.translocoService.setActiveLang(value);
    this._selectedLanguage = value;
  }

  get selectedLanguage(): string {
    return this._selectedLanguage;
  }

  ngOnInit() {
  }

}
