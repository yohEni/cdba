import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCdeComponent } from './container-cde.component';

describe('ContainerCdeComponent', () => {
  let component: ContainerCdeComponent;
  let fixture: ComponentFixture<ContainerCdeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerCdeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerCdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
