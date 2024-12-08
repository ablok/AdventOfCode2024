import fs from "node:fs";

const positions = fs
    .readFileSync("08/input.txt", { encoding: "utf8" })
    .split("\n")
    .map((line) => line.split(""));

type Position = { char: string; rowIndex: number; columnIndex: number };

const antinodes: Position[] = [];

positions.forEach((row, rowIndex) =>
    row.forEach((char, columnIndex) => {
        if (char !== ".") {
            findAllOthers({ char, rowIndex, columnIndex });
        }
    })
);

// remove double locations
console.log(antinodes.length);

function findAllOthers(currentPos: Position) {
    positions.forEach((row, rowIndex) =>
        row.forEach((char, columnIndex) => {
            if (currentPos.char === char) {
                if (currentPos.columnIndex === columnIndex && currentPos.rowIndex === rowIndex) {
                    // you are at the current location, do nothing
                    return;
                }
                const rowDiff = currentPos.rowIndex - rowIndex;
                const columnDiff = currentPos.columnIndex - columnIndex;
                const antinode = {
                    char,
                    rowIndex: currentPos.rowIndex + rowDiff,
                    columnIndex: currentPos.columnIndex + columnDiff,
                };
                if (antinode.columnIndex < 0 || antinode.columnIndex >= positions[0].length) {
                    // out of bounds, do nothing
                    return;
                }
                if (antinode.rowIndex < 0 || antinode.rowIndex >= positions.length) {
                    // out of bounds, do nothing
                    return;
                }
                if (
                    antinodes.filter(
                        (element) =>
                            antinode.columnIndex === element.columnIndex && antinode.rowIndex === element.rowIndex
                    ).length === 0
                ) {
                    // only add node if the locations does not exist yet
                    console.log(antinode)
                    antinodes.push(antinode);
                }
            }
        })
    );
    return antinodes;
}
