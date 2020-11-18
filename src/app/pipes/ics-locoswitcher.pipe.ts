import { HttpClient, HttpResponse } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'icsLocoSwitcher',
  pure: true
})

export class ICSLocoSwitcherPipe implements PipeTransform {

  constructor(private http: HttpClient, private transloco: TranslocoService) {
  }

  transform(val: string, hasInternet?: boolean) {
    if (hasInternet) {
      return `${val}.remote`;
    }

    return `${val}.local`;
  }

}
