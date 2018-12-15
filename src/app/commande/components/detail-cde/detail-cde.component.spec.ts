import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCdeComponent } from './detail-cde.component';

describe('DetailCdeComponent', () => {
  let component: DetailCdeComponent;
  let fixture: ComponentFixture<DetailCdeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCdeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
