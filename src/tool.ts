// Aiden K Morris

// mulberry32 function code from user "bryc" on StackOverflow
function mulberry32(a: number) {
  return () => {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export class SeededRandom {
    readonly random: () => number;

    constructor(seed: number) {
        this.random = mulberry32(seed);
    }
}