/**
 * Shared utility helpers.
 */

function random_key(obj: Object): number | string {
    let keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
};

export { random_key }