import { TestBed } from '@angular/core/testing';

import { DockerserviceService } from './dockerservice.service';

describe('DockerserviceService', () => {
  let service: DockerserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DockerserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
