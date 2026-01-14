import { describe, expect, it, afterEach, vi } from 'vitest';
import { Character } from '@/classes/Character';
import { Role, SkillList, Stat, RangedWeapons, ArmorList, Gear } from '@/data';
import { Weapon } from '@/classes/Weapon';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Character', () => {
  it('resets stats, skills, and cash for the selected creation method', () => {
    const character = new Character({ creation_method: 'complete', role: Role.Solo });

    for (const stat of Object.values(Stat)) {
      expect(character.stats[stat]).toBe(0);
    }

    for (const skill of SkillList) {
      expect(character.skills[skill.getKey()]).toBe(skill);
    }

    expect(character.cash).toBe(2550);
    expect(character.lifepath.starting_table).toBeDefined();
  });

  it('tracks role-specific lifepath tables when available', () => {
    const character = new Character({ creation_method: 'street rat', role: Role.Civilian });

    expect(character.role_lifepath).toBeUndefined();

    character.setRole(Role.Solo);

    expect(character.role).toBe(Role.Solo);
    expect(character.role_lifepath).toBeDefined();
  });

  it('resets armor, weapons, and gear while refunding costs', () => {
    const character = new Character({ creation_method: 'complete', role: Role.Solo });
    const armor = ArmorList.find((item) => item.armor_type === 'Light Armorjack');
    if (!armor) {
      throw new Error('Missing armor fixture');
    }

    character.cash = 0;
    character.armor.body = armor;
    character.armor.head = armor;
    character.weapons = [new Weapon({ ...RangedWeapons[0] })];
    character.gear = [Gear.agent];

    const weaponCost = character.weapons[0].cost;
    const gearCost = character.gear[0].cost;
    const armorCost = armor.cost * 2;

    character.resetArmor();
    character.resetWeapons();
    character.resetGear();

    expect(character.armor.body).toBe('None');
    expect(character.armor.head).toBe('None');
    expect(character.weapons).toHaveLength(0);
    expect(character.gear).toHaveLength(0);
    expect(character.cash).toBe(weaponCost + gearCost + armorCost);
  });

  it('loads role equipment with ammo and cyberware installed', () => {
    const character = new Character({ creation_method: 'street rat', role: Role.Solo });
    vi.spyOn(Math, 'random').mockReturnValue(0);

    character.getEquipmentFromTable();

    const assaultRifle = character.weapons.find((weapon) => weapon.name === 'Assault Rifle');
    expect(assaultRifle).toBeDefined();
    expect(assaultRifle?.ammo['Basic Ammo']).toBe(70);

    expect(character.armor.body).not.toBe('None');
    expect(character.armor.head).not.toBe('None');
    expect(character.gear.some((item) => item.name === 'Agent')).toBe(true);

    expect(character.findCyberware('Neural Link')).toHaveLength(1);
    expect(character.hasSpeedware() || character.findCyberware('Wolvers').length > 0).toBe(true);
  });

  it('adds and removes weapons and gear while enforcing cash limits', () => {
    const character = new Character({ creation_method: 'complete', role: Role.Solo });
    const weaponTemplate = RangedWeapons[0];
    const gearItem = Gear.agent;

    character.cash = weaponTemplate.cost;
    expect(character.addWeapon(weaponTemplate)).toBe(true);
    expect(character.cash).toBe(0);
    expect(character.addWeapon(weaponTemplate)).toBe(false);

    character.removeWeapon(0);
    expect(character.cash).toBe(weaponTemplate.cost);

    expect(character.addGear(gearItem)).toBe(false);
    character.cash = gearItem.cost;
    expect(character.addGear(gearItem)).toBe(true);
    expect(character.cash).toBe(0);
    character.removeGear(0);
    expect(character.cash).toBe(gearItem.cost);
  });

  it('treats Bodyweight Suit as a single armor purchase', () => {
    const character = new Character({ creation_method: 'complete', role: Role.Solo });
    const suit = ArmorList.find((item) => item.armor_type === 'Bodyweight Suit');
    const headArmor = ArmorList.find((item) => item.armor_type === 'Kevlar®');
    if (!suit || !headArmor) {
      throw new Error('Missing armor fixtures');
    }

    character.cash = suit.cost;
    expect(character.setArmor({ location: 'body', armor: suit })).toBe(true);
    expect(character.armor.body).toBe(suit);
    expect(character.armor.head).toBe(suit);
    expect(character.cash).toBe(0);

    expect(character.setArmor({ location: 'head', armor: headArmor })).toBe(true);
    expect(character.armor.body).toBe('None');
    expect(character.armor.head).toBe(headArmor);
    expect(character.cash).toBe(suit.cost - headArmor.cost);
  });
});
