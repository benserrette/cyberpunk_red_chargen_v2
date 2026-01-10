/**
 * Cyberware slot and location definitions.
 *
 * The Character class uses these locations to track installed cyberware and to
 * determine available slots during installation/removal.
 */


/**
 * Human-readable slot names for foundational cyberware locations.
 */
export const enum CyberwareLocation {
    Cyberears = "Cyberaudio Suite",
    RCybereye = "Right Cybereye",
    LCybereye = "Left Cybereye",
    RCyberarm = "Right Cyberarm",
    LCyberarm = "Left Cyberarm",
    NeuralLink = "Neural Link",
    RCyberleg = "Right Cyberleg",
    LCyberleg = "Left Cyberleg",
    Internal = "Internal",
    External = "External",
    Fashionware = "Fashionware",
    Borgware = "Borgware"
  }
