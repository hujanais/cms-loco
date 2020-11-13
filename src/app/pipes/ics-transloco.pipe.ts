import { HttpClient, HttpResponse } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'icsTransloco',
  pure: true
})

export class ICSTranslocoPipe implements PipeTransform {

  constructor(private http: HttpClient, private transloco: TranslocoService) {
    transloco.events$.subscribe(obs => {
      console.log('something changed', JSON.stringify(obs));
    });
  }

  async transform(val: string) {
    // check to see if this is a link.
    // check to see if this is an img/svg.
    // check to see if this is a video asset.
    if (this.isImage(val)) {
      return val;
    } else if (this.isVideo(val)) {
      return val;
    } else if (this.isValidUrl(val)) {
      return this.http.get(val).pipe(
        map((b: any) => JSON.stringify(b))
        // map((b: any) => b.title)
      ).toPromise();
    }

    return val;
  }

  private isValidUrl(str): boolean {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  private isImage(str): boolean {
    var patt = /.png|.svg|.jpg|.svg/i;
    var result = str.match(patt);
    return !!result;
  }

  private isVideo(str): boolean {
    var patt = /.mov|.ogg/i;
    var result = str.match(patt);
    return !!result;
  }
}
