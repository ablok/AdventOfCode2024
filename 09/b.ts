import fs from "node:fs";

const map = fs.readFileSync("09/input.txt", { encoding: "utf8" }).split("").map(Number);
const blocks: (number | string)[] = [];

// Generate block list
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

// Use all open blocks
for (let i = blocks.length - 1; i >= 0; i--) {
    const char = blocks[i];
    let length = 1;
    // Gather file length
    while (blocks[i - 1] !== "." && blocks[i - 1] === char) {
        i--;
        length++;
    }

    // Find similar size dots
    const dotIndex = blocks.indexOf(".");
    for (let j = dotIndex; j < i && length !== 0; j++) {
        let dotLength = 0;
        while (blocks[j] === "." && dotLength !== length) {
            j++;
            dotLength++;
        }

        // Swap file with dots
        if (dotLength === length) {
            while (length) {
                blocks[j - length] = blocks[i - 1 + length];
                blocks[i - 1 + length] = ".";
                length--;
            }
        }
    }
}

// Calculate checksum
const checksum = blocks.reduce((total: number, current: number | string, index) => {
    if (typeof current == "number") {
        return total + current * index;
    }
    return total;
}, 0);

console.log(checksum);
