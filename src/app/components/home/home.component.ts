import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  private _selectedLanguage = 'en';

  interpolatedValues: {};

  hasInternet = false;

  constructor(private translocoService: TranslocoService) {
    this.interpolatedValues = { maxPressurekPa: '103,421', maxPressureBar: '1034', maxPressurePSI: '15,000' }
  }

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
