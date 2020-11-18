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
        map((data: any) => data.body),// this map operation is dependent on the json content source. 
        // For this demonstration, the data payload looks like, {articleId: XX, body: YY}
        map((body: string) => this.interpolate(body, args))
      ).toPromise();
    }

    return this.interpolate(val, args);
  }

  // expecting text to be, "This is a sentence. $key1 $key2"
  // For now, the keys are case sensitive.
  // ex. The column hardware and the matched outlet tubing can withstand as much as $maxPressurekPa kPa ($maxPressureBar bar, $maxPressurePSI psi).
  private interpolate(body: string, args: {}): string {
    if (args) {
      // search for all variables defined in the article body.
      Object.keys(args).forEach(key => {
        const placeHolder = '$' + key;
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
    const patt = /.png|.svg|.jpg|.svg/i;
    const result = str.match(patt);
    return !!result;
  }

  private isVideo(str): boolean {
    const patt = /.mov|.ogg/i;
    const result = str.match(patt);
    return !!result;
  }
}
