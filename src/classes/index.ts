/**
 * Barrel exports for core domain classes.
 *
 * These exports are consumed by both the data-driven generators and the Vue
 * UI to keep imports centralized and consistent.
 */
import { Character } from "./Character";
import { Skill } from "./Skill";
import { Lifepath } from "./Lifepath";
import { Weapon } from "./Weapon";
import { Cyberware } from "@/data/cyberware";

export { Character, Skill, Lifepath, Weapon, Cyberware };
