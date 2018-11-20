import HeroNorth from "../../../../assets/hero/HeroNorth.png";
import HeroSouth from "../../../../assets/hero/HeroSouth.png";
import HeroEast from "../../../../assets/hero/HeroEast.png";
import HeroWest from "../../../../assets/hero/HeroWest.png";

export default {
  orientations: {
    north: HeroNorth,
    south: HeroSouth,
    east: HeroEast,
    west: HeroWest
  },
  animations: {
    idle: new Int8Array([0, 3]),
    walk: new Int8Array([4, 6])
  }
}