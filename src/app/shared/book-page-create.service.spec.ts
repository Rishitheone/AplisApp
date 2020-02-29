import { TestBed } from '@angular/core/testing';

import { BookPageCreateService } from './book-page-create.service';

describe('BookPageCreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookPageCreateService = TestBed.get(BookPageCreateService);
    expect(service).toBeTruthy();
  });
});
