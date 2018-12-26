import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyclassComponent } from './buyclass.component';

describe('BuyclassComponent', () => {
  let component: BuyclassComponent;
  let fixture: ComponentFixture<BuyclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
