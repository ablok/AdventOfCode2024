import fs from "node:fs";

const lines = fs.readFileSync("03/input.txt", { encoding: "utf8" }).split("\n");
let total = 0;
let skip = false;
for (const line of lines) {
    const matches = line.match(/mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\)/g);
    if (!matches) {
        continue;
    }
    for (const match of matches) {
        if (match === "do()") {
            skip = false;
            continue;
        }
        if (match === "don't()") {
            skip = true;
            continue;
        }
        if (!skip) {
            const [left, right] = match.split("(")[1].split(")")[0].split(",").map(Number);
            const result = left * right;
            total = total + result;
        }
    }
}
console.log(total);
