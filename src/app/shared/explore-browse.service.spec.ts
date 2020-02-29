import { TestBed } from '@angular/core/testing';

import { ExploreBrowseService } from './explore-browse.service';

describe('ExploreBrowseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExploreBrowseService = TestBed.get(ExploreBrowseService);
    expect(service).toBeTruthy();
  });
});
