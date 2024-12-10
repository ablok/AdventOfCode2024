import fs from "node:fs";

const grid = fs
    .readFileSync("10/input.txt", { encoding: "utf8" })
    .split("\n")
    .map((line) => line.split("").map(Number));

let trailHeadScoreSum = 0;
let trailHeadEnds: string[] = [];

grid.forEach((row, rowIndex) => {
    row.forEach((element, columnIndex) => {
        if (element === 0) {
            // starting point found, reset endings
            trailHeadEnds = [];
            findNextSteps(rowIndex, columnIndex);
            // find unique endings for trailhead
            trailHeadScoreSum += trailHeadEnds.filter(
                (value, index, trailHeadEnds) => trailHeadEnds.indexOf(value) === index
            ).length;
        }
    });
});

function findNextSteps(rowIndex: number, columnIndex: number) {
    const currentValue = grid[rowIndex][columnIndex];
    if (currentValue === 9) {
        trailHeadEnds.push(`${rowIndex}${columnIndex}`);
        return;
    }

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (Math.abs(i) !== Math.abs(j)) {
                // ignore diagonals
                const row = rowIndex + i;
                const column = columnIndex + j;
                if (!isOutOfBounds(row, column)) {
                    if (grid[row][column] === currentValue + 1) {
                        findNextSteps(row, column);
                    }
                }
            }
        }
    }
    return [];
}

console.log(trailHeadScoreSum);

function isOutOfBounds(rowIndex: number, columnIndex: number) {
    if (columnIndex < 0 || columnIndex >= grid[0].length) {
        return true;
    }
    if (rowIndex < 0 || rowIndex >= grid.length) {
        return true;
    }
    return false;
}
