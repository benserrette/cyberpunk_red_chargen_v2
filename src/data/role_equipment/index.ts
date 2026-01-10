/**
 * Role equipment table registry.
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