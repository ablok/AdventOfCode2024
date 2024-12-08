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
                let antinode = {
                    char,
                    rowIndex: currentPos.rowIndex + rowDiff,
                    columnIndex: currentPos.columnIndex + columnDiff,
                };
                // since the current position is now also an antinode, add it if it does not exist yet
                if (!doesAntinodeAlreadyExist(currentPos)) {
                    antinodes.push(currentPos)
                }
                // need to keep creating antinodes with the diff until oob
                for (let i = 1; !isOutOfBounds(antinode, positions); i++) {
                    if (!doesAntinodeAlreadyExist(antinode)) {
                        // only add node if the locations does not exist yet
                        antinodes.push(antinode);
                    }

                    // next antinode
                    antinode = {
                        char,
                        rowIndex: currentPos.rowIndex + rowDiff * i,
                        columnIndex: currentPos.columnIndex + columnDiff * i,
                    };
                }
            }
        })
    );
    return antinodes;
}

function isOutOfBounds(position: Position, positions: string[][]) {
    if (position.columnIndex < 0 || position.columnIndex >= positions[0].length) {
        return true;
    }
    if (position.rowIndex < 0 || position.rowIndex >= positions.length) {
        return true;
    }
    return false;
}

function doesAntinodeAlreadyExist(position: Position) {
    return (
        antinodes.filter(
            (element) => position.columnIndex === element.columnIndex && position.rowIndex === element.rowIndex
        ).length !== 0
    );
}
