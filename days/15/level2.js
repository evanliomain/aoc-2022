const T = require('taninsam');
const { serialize, deserialize } = require('./serialize');
const { distance } = require('./distance');
const { getBounds } = require('./get-bounds');
const { eq } = require('./eq');

let MAX = 4_000_000;

const sensors = new Set();
const beacons = new Set();

/**
 *
 * @param {{ "sx": number, "sy": number, "bx": number, "by": number, "d": number}[]} input
 * @returns
 */
module.exports = function(input) {
  if (14 === input.length) {
    // pour l'exemple donné
    MAX = 20;
  }
  console.log({ MAX });

  const pairs = [];

  for (const sensor1 of input) {
    const s1 = { x: sensor1.sx, y: sensor1.sy };
    for (const sensor2 of input) {
      const s2 = { x: sensor2.sx, y: sensor2.sy };
      if (eq(s1, s2)) {
        // skip when it's the same sensor
        continue;
      }

      const areDisjoint = sensor1.d + sensor2.d < distance(s1, s2);
      if (areDisjoint) {
        pairs.push({
          sensor1,
          sensor2,
          diff: distance(s1, s2) - (sensor1.d + sensor2.d)
        });
      }
    }
  }

  // There are only 4 sensors very close
  const nearSensors = pairs.filter(({ diff }) => 2 === diff);

  for (const { sensor1, sensor2 } of nearSensors) {
    sensors.add(serialize({ x: sensor1.sx, y: sensor1.sy }));
    sensors.add(serialize({ x: sensor2.sx, y: sensor2.sy }));
  }

  for (const sensor of sensors) {
    console.log(sensor);
  }

  /*
               A           B              B                   A
          2_540_401    2_561_955    2_970_495            2_989_899
          (356_762)      (611_473)    (573720)              (585590)
                            A:2765150 B:2766225
2_586_314                              #

2_746_490      #

B:2974641
B:2974642

A:2992918

 3_239_346                                                    #

 3_362_969                  #


  */


  // const [pair1, pair1, pair1]=nearSensors

  return sensors.size;

  for (const { sx, sy, bx, by } of input) {
    sensors.add(serialize({ x: sx, y: sy }));
    beacons.add(serialize({ x: bx, y: by }));
  }

  for (let x = 0; x <= MAX; x++) {
    for (let y = 0; y <= MAX; y++) {
      if (
        sensors.has(serialize({ x, y })) ||
        beacons.has(serialize({ x, y }))
      ) {
        continue;
      }
      const isCover = input.some(
        ({ sx, sy, d }) => distance({ x, y }, { x: sx, y: sy }) <= d
      );
      if (!isCover) {
        return x * 4000000 + y;
      }
    }
  }

  return coverage;
};
