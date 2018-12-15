import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCdeComponent } from './ajouter-cde.component';

describe('AjouterCdeComponent', () => {
  let component: AjouterCdeComponent;
  let fixture: ComponentFixture<AjouterCdeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterCdeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterCdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
