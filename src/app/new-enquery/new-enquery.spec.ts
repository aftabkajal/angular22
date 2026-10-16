import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewEnquery } from './new-enquery';

describe('NewEnquery', () => {
  let component: NewEnquery;
  let fixture: ComponentFixture<NewEnquery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEnquery],
    }).compileComponents();

    fixture = TestBed.createComponent(NewEnquery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
