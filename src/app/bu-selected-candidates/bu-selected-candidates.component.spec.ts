import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuSelectedCandidatesComponent } from './bu-selected-candidates.component';

describe('BuSelectedCandidatesComponent', () => {
  let component: BuSelectedCandidatesComponent;
  let fixture: ComponentFixture<BuSelectedCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuSelectedCandidatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuSelectedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
