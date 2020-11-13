import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private _hasInternet: boolean = false;

  constructor() { }

  get hasInternet(): boolean {
    return this._hasInternet;
  }

  set hasInternet(value: boolean) {
    this._hasInternet = value;
  }
}
