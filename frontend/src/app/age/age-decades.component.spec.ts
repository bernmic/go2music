import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeDecadesComponent } from './age-decades.component';

describe('AgeDecadesComponent', () => {
  let component: AgeDecadesComponent;
  let fixture: ComponentFixture<AgeDecadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeDecadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeDecadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
