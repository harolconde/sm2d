import { TestBed } from '@angular/core/testing';

import { UpdateDataUserService } from './update-data-user.service';

describe('UpdateDataUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateDataUserService = TestBed.get(UpdateDataUserService);
    expect(service).toBeTruthy();
  });
});
