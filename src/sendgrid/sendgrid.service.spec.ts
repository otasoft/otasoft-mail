import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { SendgridService } from './sendgrid.service';

describe('SendgridService', () => {
  let service: SendgridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, CqrsModule],
      providers: [SendgridService],
    }).compile();

    service = module.get<SendgridService>(SendgridService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
