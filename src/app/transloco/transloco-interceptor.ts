import { Injectable } from '@angular/core';
import { TranslocoInterceptor, Translation, TRANSLOCO_INTERCEPTOR } from '@ngneat/transloco';
import { SourceService } from '../services/source.service';

@Injectable({
    providedIn: 'root'
})

export class CustomInterceptor implements TranslocoInterceptor {
    constructor() {
        console.log('ctor', 'CustomInterceptor');
    }

    preSaveTranslation(translation: Translation, lang: string): Translation {
        return translation;
    }

    preSaveTranslationKey(key: string, value: string, lang: string): string {
        console.log('preSaveTranslationKey', key, value, lang);
        return value;
    }
}

export const customInterceptor = {
    provide: TRANSLOCO_INTERCEPTOR,
    useClass: CustomInterceptor
};