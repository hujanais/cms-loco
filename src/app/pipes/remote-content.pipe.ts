import { HttpClient, HttpResponse } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'remoteContent',
  pure: true
})

export class RemoteContentPipe implements PipeTransform {

  constructor(private http: HttpClient) { }

  transform(url: string) {
    return this.http.get(url).pipe(
      map((obs: any) => {
        return obs.title;
      })
    )
  }
}
