import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFileComponent } from './new-file.component';

describe('NewFileComponent', () => {
  let component: NewFileComponent;
  let fixture: ComponentFixture<NewFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
