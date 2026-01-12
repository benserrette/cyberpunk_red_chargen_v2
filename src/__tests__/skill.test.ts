import { describe, expect, it } from 'vitest';
import { Skill } from '@/classes/Skill';
import { Stat } from '@/data/stats';

describe('Skill', () => {
  it('normalizes skill names into stable keys', () => {
    expect(Skill.genKey('Heavy Weapons')).toBe('heavy_weapons');
    expect(Skill.genKey('Language - Streetslang')).toBe('language_streetslang');
    expect(Skill.genKey('Wardrobe & Style')).toBe('wardrobe_style');
  });

  it('returns the key based on the instance name', () => {
    const skill = new Skill({ name: 'Melee Weapon', stat: Stat.DEX });

    expect(skill.getKey()).toBe('melee_weapon');
  });
});
