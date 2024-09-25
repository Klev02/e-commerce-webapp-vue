import { describe, it, expect } from 'vitest';
import { capitalizeFirstLetter } from '..';

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter of a string', () => {
    const result = capitalizeFirstLetter('hello');
    expect(result).toBe('Hello');
  });

  it('should return an empty string if input is empty', () => {
    const result = capitalizeFirstLetter('');
    expect(result).toBe('');
  });
});
