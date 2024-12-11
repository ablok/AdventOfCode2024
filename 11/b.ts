import fs from "node:fs";

const stones = fs.readFileSync("11/input.txt", { encoding: "utf8" }).split(" ").map(Number);
const cache = new Map();

console.log(parseStones(stones, 75));

function parseStones(stone: number[], times: number) {
    let totalStones = 0;
    for (const stone of stones) {
        totalStones += parseStone(stone, times);
    }
    return totalStones;
}

function parseStone(stone: number, times: number) {
    times--;
    const key = `${stone}_${times}`;
    const cacheHit = cache.get(key);
    const newStones = [];

    if (cacheHit) {
        return cacheHit;
    }

    const stoneLength = String(stone).length;
    if (stone === 0) {
        newStones.push(1);
    } else if (stoneLength % 2 === 0) {
        // even length
        const left = Number(String(stone).slice(0, Math.floor(stoneLength / 2)));
        const right = Number(String(stone).slice(Math.floor(stoneLength / 2)));
        newStones.push(left, right);
    } else {
        newStones.push(stone * 2024);
    }

    if (times > 0) {
        let totalStones = 0;
        for (const stone of newStones) {
            totalStones += parseStone(stone, times);
        }
        cache.set(key, totalStones);
        return totalStones;
    } else {
        return newStones.length;
    }
}
