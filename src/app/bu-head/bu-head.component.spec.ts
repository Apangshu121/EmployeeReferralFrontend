import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuHeadComponent } from './bu-head.component';

describe('BuHeadComponent', () => {
  let component: BuHeadComponent;
  let fixture: ComponentFixture<BuHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuHeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
