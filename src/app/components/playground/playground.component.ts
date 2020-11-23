import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  hasInternet = true;
  _selectedLanguage = 'en-gb';

  constructor(private translocoService: TranslocoService, private http: HttpClient) {
  }

  set selectedLanguage(value: string) {
    this.translocoService.setActiveLang(value);
    this._selectedLanguage = value;
  }

  get selectedLanguage(): string {
    return this._selectedLanguage;
  }

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe(lang => {
      console.log('language changed', lang);
    });
  }
}
