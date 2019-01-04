import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeClientComponent } from './liste-client.component';

describe('ListeClientComponent', () => {
  let component: ListeClientComponent;
  let fixture: ComponentFixture<ListeClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
