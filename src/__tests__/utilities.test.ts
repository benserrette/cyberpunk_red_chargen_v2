import { describe, expect, it, afterEach, vi } from 'vitest';
import { random_key } from '@/utilities';

describe('random_key', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the first key when Math.random returns 0', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const result = random_key({ alpha: 1, beta: 2, gamma: 3 });

    expect(result).toBe('alpha');
  });

  it('returns the last key when Math.random is near 1', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9999);
    const result = random_key({ alpha: 1, beta: 2, gamma: 3 });

    expect(result).toBe('gamma');
  });
});
