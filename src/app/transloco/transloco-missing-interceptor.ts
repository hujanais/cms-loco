import { Injectable } from '@angular/core';
import { TranslocoMissingHandler, TranslocoConfig, TRANSLOCO_MISSING_HANDLER, TranslocoService } from '@ngneat/transloco';
import { SourceService } from '../services/source.service';

@Injectable({
    providedIn: 'root'
})

export class MissingInterceptor implements TranslocoMissingHandler {

    constructor(private sourceService: SourceService, private translocoService: TranslocoService) {
        // console.log('ctor', 'MissingInterceptor');
    }

    handle(key: string, config: TranslocoConfig) {

        // const newKey = `${key}.local`;
        // console.log(newKey);
        // return this.translocoService.translate(newKey);

        return `FUBAR: ${key} is missing`;
    }
}

export const customMissingHandler = {
    provide: TRANSLOCO_MISSING_HANDLER,
    useClass: MissingInterceptor
};