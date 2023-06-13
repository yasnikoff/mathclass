import { Test, TestingModule } from '@nestjs/testing';
import { MathTestsService } from './mathTests.service';

describe('TestsService', () => {
  let service: MathTestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MathTestsService],
    }).compile();

    service = module.get<MathTestsService>(MathTestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
