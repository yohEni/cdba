import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerClientComponent } from './container-client.component';

describe('ContainerClientComponent', () => {
  let component: ContainerClientComponent;
  let fixture: ComponentFixture<ContainerClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
