import { TestBed, inject } from '@angular/core/testing';

import { PresenterService } from './presenter.service';

describe('PresenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PresenterService]
    });
  });

  it('should be created', inject([PresenterService], (service: PresenterService) => {
    expect(service).toBeTruthy();
  }));
});
