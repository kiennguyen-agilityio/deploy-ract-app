import { ShowErrors } from '../ShowErrors';

describe('ShowErrors', () => {
  it('should create an instance of ShowErrors with the provided message', () => {
    const errorMessage = 'This is an error message';
    const showErrors = new ShowErrors(errorMessage);

    expect(showErrors).toBeInstanceOf(ShowErrors);
    expect(showErrors.message).toBe(errorMessage);
  });
});
