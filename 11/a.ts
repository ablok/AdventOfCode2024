import fs from "node:fs";

const stones = fs.readFileSync("11/input.txt", { encoding: "utf8" }).split(" ").map(Number);
const times = 25;

const newStones = parseStones(stones, times);
console.log(newStones.length);

function parseStones(stones: number[], times: number) {
    times--;
    let newStones: number[] = [];
    stones.forEach((stone, index) => {
        if (stone === 0) {
            newStones.push(1);
            return;
        }

        const stoneLenght = String(stone).length;
        if (stoneLenght % 2 === 0) {
            // even length
            const left = Number(String(stone).slice(0, Math.floor(stoneLenght / 2)));
            const right = Number(String(stone).slice(Math.floor(stoneLenght / 2)));
            newStones.push(left, right);
            return;
        }

        newStones.push(stone * 2024);
    });
    if (times > 0) {
        newStones = parseStones(newStones, times);
    }
    return newStones;
}
