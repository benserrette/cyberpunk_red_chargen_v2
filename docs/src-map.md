# `src/` directory map

This map documents the purpose of each file in `src/`.

## Application entry + routing
- `src/main.ts` — boots the Vue app, installs Pinia and the router, and mounts the root component.
- `src/App.vue` — root app shell that renders the active route and footer.
- `src/router/index.ts` — Vue Router configuration for the home route.

## Global styles
- `src/style.css` — Tailwind CSS directives for base/components/utilities.

## Views
- `src/views/HomeView.vue` — main character generator view and UI wiring for stats, skills, and equipment.

## Utility helpers
- `src/utilities.ts` — small helper for picking a random key from an object.

## Types
- `src/types/index.ts` — shared type exports for data models (weapons, ammo, armor, gear, cyberware).

## Domain classes
- `src/classes/Character.ts` — core character model with randomization, equipment, stats, and lifepath logic.
- `src/classes/Lifepath.ts` — lifepath table/row classes and traversal helpers.
- `src/classes/Skill.ts` — skill model with stat linkage and key generation.
- `src/classes/Weapon.ts` — weapon model with ammo, attachments, and quality logic.
- `src/classes/index.ts` — barrel export for core classes.

## Components
- `src/components/CPButton.vue` — stylized “notched” button component.
- `src/components/CPCell.vue` — table cell wrapper with Cyberpunk-style borders.
- `src/components/CPRow.vue` — table row wrapper with Cyberpunk-style borders.
- `src/components/CPTable.vue` — table wrapper with title and optional randomize button.
- `src/components/CPTitle.vue` — section title bar with optional border.
- `src/components/Modal.vue` — reusable modal overlay for detail views.
- `src/components/SkillRow.vue` — single-row renderer for a skill entry.
- `src/components/SkillTable.vue` — table renderer for skill lists (by category or chunk).
- `src/components/SkillsByGroup.vue` — grouped skill tables by category.
- `src/components/StatsBlock.vue` — grid of editable stat fields.
- `src/components/TextField.vue` — generic labeled field component (text/number/select).
- `src/components/TextFieldRow.vue` — layout for multiple `TextField` values in a row.

## Data catalogs
- `src/data/index.ts` — barrel export for core data enums and catalogs.
- `src/data/stats.ts` — stat enum definitions.
- `src/data/roles.ts` — role enum definitions.
- `src/data/skills.ts` — skill catalog, categories, and required skill list.
- `src/data/armor.ts` — armor catalog and armor type definitions.
- `src/data/weapons.ts` — melee and ranged weapon catalogs.
- `src/data/weapon_attachments.ts` — attachment catalog and attachment metadata.
- `src/data/ammo_types.ts` — ammo type catalog with supported weapon types.
- `src/data/clip_chart.ts` — ammo clip size chart keyed by weapon.
- `src/data/gear.ts` — gear catalog and descriptions.
- `src/data/cyberware.ts` — cyberware classes, enums, and catalog definitions.
- `src/data/cyberware_locations.ts` — cyberware slot/location definitions.
- `src/data/lifepath_tables.ts` — base lifepath tables for character background generation.
- `src/data/edge_runnner_stat_tables.ts` — role-based stat arrays used for edge runner creation.
- `src/data/edge_runner_skill_tables.ts` — role-based skill point tables for edge runner creation.

### Role-specific lifepath tables
- `src/data/role_lifepath_tables/index.ts` — barrel export for role lifepath tables.
- `src/data/role_lifepath_tables/exec.ts` — executive role-specific lifepath table.
- `src/data/role_lifepath_tables/solo.ts` — solo role-specific lifepath table.

### Role-specific equipment tables
- `src/data/role_equipment/index.ts` — map of role names to equipment tables.
- `src/data/role_equipment/civilian.ts` — civilian equipment roll table.
- `src/data/role_equipment/exec.ts` — exec equipment roll table.
- `src/data/role_equipment/fixer.ts` — fixer equipment roll table.
- `src/data/role_equipment/lawman.ts` — lawman equipment roll table.
- `src/data/role_equipment/media.ts` — media equipment roll table.
- `src/data/role_equipment/medtech.ts` — medtech equipment roll table.
- `src/data/role_equipment/netrunner.ts` — netrunner equipment roll table.
- `src/data/role_equipment/nomad.ts` — nomad equipment roll table.
- `src/data/role_equipment/rockerboy.ts` — rockerboy equipment roll table.
- `src/data/role_equipment/solo.ts` — solo equipment roll table.
- `src/data/role_equipment/tech.ts` — tech equipment roll table.
