import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorFormDialogComponent } from './author-form-dialog.component';

describe('AuthorFormDialogComponent', () => {
  let component: AuthorFormDialogComponent;
  let fixture: ComponentFixture<AuthorFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
