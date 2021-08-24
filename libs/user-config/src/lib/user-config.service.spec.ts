import { Test } from '@nestjs/testing';
import { UserConfigService } from './user-config.service';

describe('UserConfigService', () => {
  let service: UserConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserConfigService],
    }).compile();

    service = module.get(UserConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
