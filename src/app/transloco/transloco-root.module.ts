import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule
} from '@ngneat/transloco';
import { Injectable, NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { concat, Observable, observable } from 'rxjs';
import { ILanguages } from '../interfaces/ILanguages';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  languages: ILanguages;

  constructor(private http: HttpClient) {
    this.languages = { files: ['part-1.json', 'part-2.json'] };
  }

  getTranslation(lang: string): Observable<unknown> {
    const sources = [];

    // merge all the files for the requested language.
    this.languages.files.forEach(file => {
      sources.push(this.http.get<Translation>(`/assets/i18n/${lang}/${file}`));
    });

    // merge the json content from cms.
    sources.push(this.http.get(`${environment.cmsUrl}/${lang}`).pipe(
      tap((m: any) => {
        if (m.errorCode !== 0) {
          throw new Error(m.message);
        }
      }),
      map((m: any) => m.data)
    ));

    return concat(...sources);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en-gb', 'es'],
        defaultLang: 'en-gb',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: environment.production,
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
  ]
})
export class TranslocoRootModule { }
