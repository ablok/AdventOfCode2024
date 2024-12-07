import fs from "node:fs";

type Position = {
    isVisited: boolean;
    isObstructed: boolean;
};
type Direction = "left" | "right" | "up" | "down";

type Point = {
    column: number;
    row: number;
};
type Current = Point & {
    direction: Direction;
};

let current: Current = { column: 0, row: 0, direction: "up" };

const positions = fs
    .readFileSync("06/input.txt", { encoding: "utf8" })
    .split("\n")
    .map((line, row) =>
        line.split("").map((char, column) => {
            const position: Position = {
                isVisited: false,
                isObstructed: false,
            };
            if (char === "#") {
                position.isObstructed = true;
            }
            if (char === "^") {
                current = { column, row, direction: "up" };
                position.isVisited = true;
            }
            return position;
        })
    );

while (
    !endReached(current, {
        column: positions[0].length - 1,
        row: positions.length - 1,
    })
) {
    doNextStep(current, positions);
    positions[current.column][current.row].isVisited = true;
}

let counter = 0;

positions.forEach((line) => {
    line.forEach((position) => {
        if (position.isVisited) {
            counter += 1;
        }
    });
});
console.log(counter);

function doNextStep(current: Current, positions: Position[][]) {
    switch (current.direction) {
        case "up":
            if (positions[current.row - 1][current.column].isObstructed) {
                current.direction = "right";
                doNextStep(current, positions);
            } else {
                current.row -= 1;
            }
            break;
        case "down":
            if (positions[current.row + 1][current.column].isObstructed) {
                current.direction = "left";
                doNextStep(current, positions);
            } else {
                current.row += 1;
            }
            break;
        case "left":
            if (positions[current.row][current.column - 1].isObstructed) {
                current.direction = "up";
                doNextStep(current, positions);
            } else {
                current.column -= 1;
            }
            break;
        case "right":
            if (positions[current.row][current.column + 1].isObstructed) {
                current.direction = "down";
                doNextStep(current, positions);
            } else {
                current.column += 1;
            }
            break;
    }
}

function endReached(current: Current, sizeIndex: Point) {
    let endReached = false;
    switch (current.direction) {
        case "up":
            if (current.row === 0) {
                endReached = true;
            }
            break;
        case "down":
            if (current.row === sizeIndex.row) {
                endReached = true;
            }
            break;
        case "left":
            if (current.column === 0) {
                endReached = true;
            }

            break;
        case "right":
            if (current.column === sizeIndex.column) {
                endReached = true;
            }

            break;
    }
    return endReached;
}
