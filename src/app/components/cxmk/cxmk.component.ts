import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cxmk',
  templateUrl: './cxmk.component.html',
  styleUrls: ['./cxmk.component.scss']
})
export class CxmkComponent implements OnInit {

  _selectedArticleId: any;
  contentKey: string;

  constructor() { }

  ngOnInit() {
    this.selectedArticleId = 'None';
  }

  set selectedArticleId(key: string) {
    this._selectedArticleId = key;
    this.contentKey = `cxkm.article.${this.selectedArticleId}.body`;
  }

  get selectedArticleId(): string {
    return this._selectedArticleId;
  }
}
