import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyntheseCdeComponent } from './synthese-cde.component';

describe('SyntheseCdeComponent', () => {
  let component: SyntheseCdeComponent;
  let fixture: ComponentFixture<SyntheseCdeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyntheseCdeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyntheseCdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
