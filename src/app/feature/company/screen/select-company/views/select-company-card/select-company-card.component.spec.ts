import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCompanyCardComponent } from './select-company-card.component';

describe('SelectCompanyCardComponent', () => {
  let component: SelectCompanyCardComponent;
  let fixture: ComponentFixture<SelectCompanyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCompanyCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCompanyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
