import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CxmkComponent } from './cxmk.component';

describe('CxmkComponent', () => {
  let component: CxmkComponent;
  let fixture: ComponentFixture<CxmkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CxmkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CxmkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
