import { Test, TestingModule } from '@nestjs/testing';

import { WorkoutTrackerController } from './workout-tracker.controller';

describe('WorkoutTrackerController', () => {
  let controller: WorkoutTrackerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutTrackerController],
    }).compile();

    controller = module.get<WorkoutTrackerController>(WorkoutTrackerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
