import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCdeComponent } from './historique-cde.component';

describe('HistoriqueCdeComponent', () => {
  let component: HistoriqueCdeComponent;
  let fixture: ComponentFixture<HistoriqueCdeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueCdeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueCdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
