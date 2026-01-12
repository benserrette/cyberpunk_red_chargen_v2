import { describe, expect, it, vi, afterEach } from 'vitest';
import { Character } from '@/classes/Character';
import { Cyberware as CyberwareList } from '@/data';
import { Cyberware, BodyLocation } from '@/data/cyberware';

const getCyberware = (name: string) => {
  const base = CyberwareList.find((item) => item.name === name);
  if (!base) {
    throw new Error(`Missing cyberware fixture: ${name}`);
  }
  return new Cyberware({ ...base });
};

describe('Cyberware installation rules', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('requires foundational cyberware before installing options', () => {
    const character = new Character();
    const chyron = getCyberware('Chyron');

    expect(() => character.canInstallCyberware({ cyberware: chyron })).toThrow(
      'Cannot install Chyron without Cybereye'
    );
  });

  it('requires paired cyberware when marked as must_be_paired', () => {
    const character = new Character();
    const cybereye = getCyberware('Cybereye');
    const antiDazzle = getCyberware('Anti-Dazzle');

    character.cyberware[BodyLocation.LeftEye] = cybereye;

    expect(() => character.canInstallCyberware({ cyberware: antiDazzle })).toThrow(
      'Cannot install Anti-Dazzle without 2x Cybereye'
    );
  });

  it('installs paired options across both foundational cyberware', () => {
    const character = new Character();
    const leftEye = getCyberware('Cybereye');
    const rightEye = getCyberware('Cybereye');
    const antiDazzle = getCyberware('Anti-Dazzle');

    character.cyberware[BodyLocation.LeftEye] = leftEye;
    character.cyberware[BodyLocation.RightEye] = rightEye;

    vi.spyOn(Math, 'random').mockReturnValue(0);

    character.installCyberware({ cyberware: antiDazzle, free: true });

    expect(character.findCyberware('Anti-Dazzle')).toHaveLength(2);
    expect(leftEye.slotted_options.some((option) => option.name === 'Anti-Dazzle')).toBe(true);
    expect(rightEye.slotted_options.some((option) => option.name === 'Anti-Dazzle')).toBe(true);
  });

  it('blocks foundational installs when no body slots are available', () => {
    const character = new Character();
    const cyberarm = getCyberware('Cyberarm');

    character.cyberware[BodyLocation.LeftArm] = getCyberware('Cyberarm');
    character.cyberware[BodyLocation.RightArm] = getCyberware('Cyberarm');

    expect(() => character.canInstallCyberware({ cyberware: cyberarm })).toThrow(
      'Cannot install Cyberarm.  No locations available.'
    );
  });
});
