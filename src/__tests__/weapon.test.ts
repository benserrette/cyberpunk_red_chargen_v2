import { describe, expect, it } from 'vitest';
import { Weapon } from '@/classes/Weapon';
import { WeaponAttachments } from '@/data/weapon_attachments';

const createPistol = () =>
  new Weapon({
    name: 'Medium Pistol',
    skill: 'handgun',
    damage: '2d6',
    rof: 2,
    concealed: true,
    cost: 50,
    ammo_type: ['M Pistol'],
  });

describe('Weapon ammo and attachment rules', () => {
  it('adds supported ammo and rejects unsupported or unknown ammo types', () => {
    const weapon = createPistol();
    const startingAmmo = weapon.ammo['Basic Ammo'] ?? 0;

    weapon.addAmmo('Basic Ammo', 10);
    expect(weapon.ammo['Basic Ammo']).toBe(startingAmmo + 10);

    expect(() => weapon.addAmmo('Basic Arrow', 1)).toThrow(
      'AmmoType (Basic Arrow) not supported by this weapon (Medium Pistol)'
    );
    expect(() => weapon.addAmmo('Not Real Ammo', 1)).toThrow(
      'AmmoType (Not Real Ammo) not found'
    );
  });

  it('validates attachment eligibility and slot capacity', () => {
    const weapon = createPistol();
    const bayonet = WeaponAttachments.bayonet;

    expect(() => weapon.addAttachment(bayonet)).toThrow('Attachment not eligible for this weapon');

    const extendedMagazine = WeaponAttachments.extended_magazine;
    const smartgunLink = WeaponAttachments.smartgun_link;

    weapon.addAttachment(extendedMagazine);
    expect(() => weapon.addAttachment(smartgunLink)).toThrow('Not enough attachment slots');
  });
});
