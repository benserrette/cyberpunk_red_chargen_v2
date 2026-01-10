/**
 * Shared utility helpers that support multiple layers of the app.
 *
 * The helpers in this module are intentionally UI-agnostic so they can be reused
 * by both the domain models (ex: Character randomization) and the Vue
 * components that render or mutate those models.
 */

/**
 * Pick a random key from an object.
 *
 * Used by the Character stat randomizer and any other logic that needs an
 * unbiased key selection without caring about the object's values.
 */
function random_key(obj: Object): number | string {
    let keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
};

export { random_key }
