import { envs } from '@utils/constants';

describe('Utils, constants', () => {
  test('should define envs values', () => {
    const keys: string[] = Object.keys(envs);
    for (let index = 0; index < keys.length; index++) {
      const k = keys[index] as keyof typeof envs;
      expect(envs[k]).toBeDefined();
    }
  });
});
