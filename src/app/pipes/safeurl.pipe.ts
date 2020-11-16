import { DomSanitizer } from '@angular/platform-browser'
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'safeUrl',
    pure: true
})
export class SafeUrlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) { }
    transform(value) {
        return this.sanitized.bypassSecurityTrustUrl(value);
    }
}