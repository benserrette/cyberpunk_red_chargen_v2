/**
 * Skill domain model and key helpers.
 */
import { Stat } from "@/data";

export class Skill {
  name: string;
  stat: Stat;
  lvl: number;
  description?: string;
  x2: boolean;

  constructor({
    name,
    stat,
    lvl = 0,
    description,
    x2 = false,
  }: {
    name: string;
    stat: Stat;
    lvl?: number;
    description?: string;
    x2?: boolean;
  }) {
    this.name = name;
    this.stat = stat;
    this.lvl = lvl;
    this.description = description;
    this.x2 = x2;
  }


  getKey(): string {
    return Skill.genKey(this.name);
  }
  static genKey(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  }
}