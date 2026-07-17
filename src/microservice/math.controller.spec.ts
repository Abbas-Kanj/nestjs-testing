import { Test, TestingModule } from '@nestjs/testing';
import { MathController } from './math.controller';

describe('MathController', () => {
  let controller: MathController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MathController],
    }).compile();

    controller = module.get<MathController>(MathController);
  });

  describe('sum', () => {
    it('adds all numbers together', () => {
      expect(controller.sum([1, 2, 3, 4])).toBe(10);
    });

    it('returns 0 for an empty array', () => {
      expect(controller.sum([])).toBe(0);
    });
  });

  describe('handleLog', () => {
    it('logs the received message', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation();

      controller.handleLog('hello');

      expect(logSpy).toHaveBeenCalledWith('[event] received: hello');
      logSpy.mockRestore();
    });
  });
});
