import { Role } from './roles';

type RoleAbility = {
    name: string;
    description: string;
};

const role_abilities: Record<Role, RoleAbility | null> = {
    [Role.Solo]: { name: "Combat Awareness", description: "Spend points from your Role Ability Rank to boost combat stats." },
    [Role.Fixer]: { name: "Operator", description: "Leverage contacts to source goods, services, and favors." },
    [Role.Netrunner]: { name: "Interface", description: "Manipulate the NET and run programs through cyberdeck actions." },
    [Role.Civilian]: null,
    [Role.Rockerboy]: { name: "Charismatic Impact", description: "Influence crowds and individuals with your presence." },
    [Role.Tech]: { name: "Maker", description: "Invent, fabricate, or upgrade items using technical expertise." },
    [Role.Medtech]: { name: "Medicine", description: "Apply medical training for treatment and pharmaceuticals." },
    [Role.Media]: { name: "Credibility", description: "Leverage reputation to gather information and shape narratives." },
    [Role.Exec]: { name: "Teamwork", description: "Command a support team to assist in operations." },
    [Role.Lawman]: { name: "Backup", description: "Call in support from law enforcement contacts." },
    [Role.Nomad]: { name: "Moto", description: "Access and manage a vehicle-based family network." }
};

export { role_abilities as RoleAbilities };
