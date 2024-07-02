import { TestBed } from '@angular/core/testing';

import { DockerHubService } from './docker-hub.service';

describe('DockerHubService', () => {
  let service: DockerHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DockerHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
