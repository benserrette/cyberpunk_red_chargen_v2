/**
 * Role equipment table registry.
 *
 * Character.getEquipmentFromTable reads from this registry to seed gear for
 * the current role during generation.
 */
import Solo from './solo';
import Rockerboy from './rockerboy';
import Netrunner from './netrunner';
import Exec from './exec';
import Civilian from './civilian';
import Fixer from './fixer';
import Media from './media';
import Lawman from './lawman';
import Medtech from './medtech';
import Nomad from './nomad';
import Tech from './tech';

/**
 * Lookup map of role name to equipment roll table arrays.
 */
const table: Record<string, any> = {
    "Solo": Solo,
    "Rockerboy": Rockerboy,
    "Netrunner": Netrunner,
    "Exec": Exec,
    "Civilian": Civilian,
    "Fixer": Fixer,
    "Media": Media,
    "Lawman": Lawman,
    "Medtech": Medtech,
    "Nomad": Nomad,
    "Tech": Tech
}

export default table;
