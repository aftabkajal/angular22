import { TestBed } from '@angular/core/testing';
import { Enquery } from './enquery';

describe('Enquery', () => {
  let service: Enquery;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Enquery);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
