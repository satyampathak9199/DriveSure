import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookingedit } from './bookingedit';

describe('Bookingedit', () => {
  let component: Bookingedit;
  let fixture: ComponentFixture<Bookingedit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookingedit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookingedit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
