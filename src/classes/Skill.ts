/**
 * Skill domain model and key helpers.
 *
 * Skills are seeded from the skill data tables and then mutated by Character
 * generation logic. UI components read the same Skill instances to display
 * level, associated stat, and special rules like x2 costs.
 */
import { Stat } from "@/data/stats";

/**
 * Represents a character skill and its current rank.
 */
export class Skill {
  name: string;
  stat: Stat;
  lvl: number;
  description?: string;
  x2: boolean;

  /**
   * Create a Skill instance from static data plus optional overrides.
   */
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


  /**
   * Generate a stable key for storing the skill in lookup maps.
   */
  getKey(): string {
    return Skill.genKey(this.name);
  }
  /**
   * Normalize a skill name to the slug used throughout the codebase.
   */
  static genKey(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  }
}
