import { AppError } from './appError';

describe('Error', () => {
  it('should create an instance', () => {
    expect(new AppError()).toBeTruthy();
  });
});
