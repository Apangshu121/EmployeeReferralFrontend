import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferredCandidateAdminComponent } from './referred-candidate-admin.component';

describe('ReferredCandidateAdminComponent', () => {
  let component: ReferredCandidateAdminComponent;
  let fixture: ComponentFixture<ReferredCandidateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReferredCandidateAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReferredCandidateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
