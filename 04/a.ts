import fs from "node:fs"

const grid = fs
    .readFileSync("04/input.txt", { encoding: "utf8" })
    .split("\n")
    .map((line) => line.split(""))

const horizontals = grid.map((line) => line.join(""))

const verticals = []
for (var y = 0; y < grid.length; y++) {
    let vertical = []
    for (var x = 0; x < grid[0].length; x++) {
        vertical.push(grid[x][y])
    }
    verticals.push(vertical.join(""))
}

const diagonals = []
// Top left to bottom right, from left to right
for (var x = 0; x < grid.length; x++) {
    diagonals.push(getDiagonalFromTLtoBR(grid, x, 0))
}
// Top left to bottom right, from top to bottom
for (var y = 1; y < grid[0].length; y++) {
    diagonals.push(getDiagonalFromTLtoBR(grid, 0, y))
}
// Top right to bottom left, from right to left
for (var x = grid[0].length - 1; x >= 0; x--) {
    diagonals.push(getDiagonalFromTRtoBL(grid, x, 0))
}
// Top right to bottom left, from top to bottom
for (var y = 1; y < grid.length; y++) {
    diagonals.push(getDiagonalFromTRtoBL(grid, grid[0].length - 1, y))
}

const lines = horizontals.concat(verticals, diagonals)
let counter = 0
for (const line of lines) {
    const xmass = line.match(/XMAS/g)
    const samxs = line.match(/SAMX/g)
    if (xmass) {
        counter = counter + xmass.length
    }
    if (samxs) {
        counter = counter + samxs.length
    }
}
console.log(counter)

function getDiagonalFromTLtoBR(grid: string[][], x: number, y: number) {
    const diagonal: string[] = []
    while (x < grid.length && y < grid[x].length) {
        diagonal.push(grid[y][x])
        y++
        x++
    }
    return diagonal.join("")
}

function getDiagonalFromTRtoBL(grid: string[][], x: number, y: number) {
    const diagonal: string[] = []
    while (x >= 0 && y < grid[x].length) {
        diagonal.push(grid[y][x])
        y++
        x--
    }
    return diagonal.join("")
}
