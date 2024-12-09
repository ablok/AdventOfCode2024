import fs from "node:fs";

const map = fs.readFileSync("09/input.txt", { encoding: "utf8" }).split("").map(Number);
const blocks: (number | string)[] = [];

map.forEach((item, index) => {
    if (index % 2 == 0) {
        // even
        for (let i = item; i > 0; i--) {
            blocks.push(index / 2);
        }
    } else {
        // uneven
        for (let i = item; i > 0; i--) {
            blocks.push(".");
        }
    }
});

for (let i = blocks.length - 1; i >= 0; i--) {
    const dotIndex = blocks.indexOf(".");
    if (dotIndex >= i) {
        break; // filled all open dots
    }
    blocks[dotIndex] = blocks[i];
    blocks[i] = ".";
}

const checksum = blocks.reduce((total: number, current: number | string, index) => {
    if (typeof current == "number") {
        return total + current * index;
    }
    return total;
}, 0);

console.log(checksum)