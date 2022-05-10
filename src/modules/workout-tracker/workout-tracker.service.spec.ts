import { Test, TestingModule } from '@nestjs/testing';

import { WorkoutTrackerService } from './workout-tracker.service';

describe('WorkoutTrackerService', () => {
  let service: WorkoutTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutTrackerService],
    }).compile();

    service = module.get<WorkoutTrackerService>(WorkoutTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
