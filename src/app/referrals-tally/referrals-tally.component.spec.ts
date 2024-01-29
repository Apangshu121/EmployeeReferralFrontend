import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsTallyComponent } from './referrals-tally.component';

describe('ReferralsTallyComponent', () => {
  let component: ReferralsTallyComponent;
  let fixture: ComponentFixture<ReferralsTallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReferralsTallyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReferralsTallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
