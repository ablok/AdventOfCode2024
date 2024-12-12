import fs from "node:fs";
type Point = {
    value: string;
    covered: boolean;
    rowIndex: number;
    columnIndex: number;
    gates: {
        north: boolean;
        west: boolean;
        east: boolean;
        south: boolean;
    };
};

const points: Point[][] = fs
    .readFileSync("12/input.txt", { encoding: "utf8" })
    .split("\n")
    .map((line, rowIndex) =>
        line.split("").map((item, columnIndex) => {
            return {
                value: item,
                covered: false,
                rowIndex,
                columnIndex,
                gates: { north: false, west: false, east: false, south: false },
            };
        })
    );

const plots: Point[][] = [];
points.forEach((row) =>
    row.forEach((point) => {
        if (!point.covered) {
            plots.push(getPlot(point));
        }
    })
);

const result = plots.reduce((total, plot) => {
    const gates = plot.reduce((total, point) => {
        if (point.gates.north) total++;
        if (point.gates.south) total++;
        if (point.gates.west) total++;
        if (point.gates.east) total++;

        return total;
    }, 0);
    return total + plot.length * gates;
}, 0);

console.log(result);

function getPlot(point: Point) {
    const plot: Point[] = [];
    plot.push(point);
    point.covered = true;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            // ignore diagonals
            if (Math.abs(i) !== Math.abs(j)) {
                const rowIndex = point.rowIndex + i;
                const columnIndex = point.columnIndex + j;

                if (
                    isOutOfBounds(rowIndex, columnIndex) || // ignore OoB
                    point.value !== points[rowIndex][columnIndex].value // ignore if different
                ) {
                    // place a gate on the side that's invalid
                    if (i === -1) point.gates.north = true;
                    if (i === 1) point.gates.south = true;
                    if (j === -1) point.gates.west = true;
                    if (j === 1) point.gates.east = true;
                } else {
                    if (!points[rowIndex][columnIndex].covered) {
                        // ignore already covererd
                        const result = getPlot(points[rowIndex][columnIndex]);
                        plot.push(...result);
                    }
                }
            }
        }
    }

    return plot;
}

function isOutOfBounds(rowIndex: number, columnIndex: number) {
    if (columnIndex < 0 || columnIndex >= points[0].length) {
        return true;
    }
    if (rowIndex < 0 || rowIndex >= points.length) {
        return true;
    }
    return false;
}
