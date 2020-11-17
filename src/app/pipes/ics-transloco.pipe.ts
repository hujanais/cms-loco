import { HttpClient, HttpResponse } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'icsTransloco',
  pure: true
})

export class ICSTranslocoPipe implements PipeTransform {

  private cachedData: any = null;

  constructor(private http: HttpClient, private transloco: TranslocoService) {
  }

  async transform(val: string, args: {}) {
    // check to see if this is a link.
    // check to see if this is an img/svg.
    // check to see if this is a video asset.
    if (this.isImage(val)) {
      return val;
    } else if (this.isVideo(val)) {
      return val;
    } else if (this.isValidUrl(val)) {
      return this.http.get(val).pipe(
        map((data: any) => data.body),
        map((body: string) => this.interpolate(body, args))
      ).toPromise();
    }

    return val;
  }

  // expecting text to be, "This is a sentence. $key1 $key2"
  // For now, the keys are case sensitive.
  private interpolate(body: string, args: {}): string {
    if (args) {
      // search for all variables defined in the article body.
      Object.keys(args).forEach(key => {
        let placeHolder = '$' + key;
        body = body.replace(placeHolder, args[key]);
      });
    }

    return body;
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
    let patt = /.png|.svg|.jpg|.svg/i;
    let result = str.match(patt);
    return !!result;
  }

  private isVideo(str): boolean {
    let patt = /.mov|.ogg/i;
    let result = str.match(patt);
    return !!result;
  }
}
