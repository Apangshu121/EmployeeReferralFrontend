import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCandidatesComponent } from './search-candidates.component';

describe('SearchCandidatesComponent', () => {
  let component: SearchCandidatesComponent;
  let fixture: ComponentFixture<SearchCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchCandidatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
