import { Test } from '@nestjs/testing';
import { VoiceService } from './voice.service';

describe('VoiceService', () => {
  let service: VoiceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [VoiceService],
    }).compile();

    service = module.get(VoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
