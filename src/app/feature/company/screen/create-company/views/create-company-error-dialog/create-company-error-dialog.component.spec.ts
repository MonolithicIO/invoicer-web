import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyErrorDialogComponent } from './create-company-error-dialog.component';

describe('CreateCompanyErrorDialogComponent', () => {
  let component: CreateCompanyErrorDialogComponent;
  let fixture: ComponentFixture<CreateCompanyErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCompanyErrorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCompanyErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
