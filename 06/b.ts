import fs from "node:fs";

type Position = {
    isObstructed: boolean;
    timesHit: number;
    char: string;
};
type Direction = "left" | "right" | "up" | "down";

type Point = {
    column: number;
    row: number;
};
type Current = Point & {
    direction: Direction;
};

let start: Current;

const positions = fs
    .readFileSync("06/input.txt", { encoding: "utf8" })
    .split("\n")
    .map((line, row) =>
        line.split("").map((char, column) => {
            const position: Position = {
                isObstructed: false,
                timesHit: 0,
                char,
            };
            if (char === "#") {
                position.isObstructed = true;
            }
            if (char === "^") {
                start = { column, row, direction: "up" };
            }
            return position;
        })
    );

let counter = 0;
positions.forEach((line, row) => {
    line.forEach((char, column) => {
        if (column === start.column && row === start.row) {
            return;
        }

        let stuck = false;
        const current: Current = {
            row: start.row,
            column: start.column,
            direction: start.direction,
        };
        const positionsCopy = nestedCopy(positions);
        positionsCopy[row][column].isObstructed = true;
        positionsCopy[row][column].char = "#";
        while (
            !endReached(current, {
                column: positionsCopy[0].length - 1,
                row: positionsCopy.length - 1,
            }) &&
            !stuck
        ) {
            stuck = doNextStep(current, positionsCopy);
        }
        if (stuck) {
            counter += 1;
        }
    });
});

console.log(counter);

function doNextStep(current: Current, positions: Position[][]) {
    let stuck = false;
    let nextPosition;

    switch (current.direction) {
        case "up":
            nextPosition = positions[current.row - 1][current.column];
            if (nextPosition.isObstructed) {
                nextPosition.timesHit += 1;
                current.direction = "right";
                doNextStep(current, positions);
            } else {
                current.row -= 1;
            }
            break;
        case "down":
            nextPosition = positions[current.row + 1][current.column];
            if (nextPosition.isObstructed) {
                nextPosition.timesHit += 1;
                current.direction = "left";
                doNextStep(current, positions);
            } else {
                current.row += 1;
            }
            break;
        case "left":
            nextPosition = positions[current.row][current.column - 1];
            if (nextPosition.isObstructed) {
                nextPosition.timesHit += 1;
                current.direction = "up";
                doNextStep(current, positions);
            } else {
                current.column -= 1;
            }
            break;
        case "right":
            nextPosition = positions[current.row][current.column + 1];
            if (nextPosition.isObstructed) {
                nextPosition.timesHit += 1;
                current.direction = "down";
                doNextStep(current, positions);
            } else {
                current.column += 1;
            }
            break;
    }
    if (nextPosition.timesHit > 3) {
        stuck = true;
    }
    return stuck;
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

function nestedCopy(array: Position[][]) {
    return JSON.parse(JSON.stringify(array)) as Position[][];
}
