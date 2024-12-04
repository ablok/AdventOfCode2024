import fs from "node:fs"

const grid = fs
    .readFileSync("04/input.txt", { encoding: "utf8" })
    .split("\n")
    .map((line) => line.split(""))

let counter = 0

for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length - 1; x++) {
        let valid = true
        if (grid[y][x] === "A") {
            const topLeft = grid[y - 1][x - 1]
            const topRight = grid[y - 1][x + 1]
            const bottomLeft = grid[y + 1][x - 1]
            const bottomRight = grid[y + 1][x + 1]

            if (topLeft === "M" || topLeft == "S") {
                if (topLeft === "M") {
                    if (bottomRight !== "S") {
                        valid = false
                    }
                }
                if (topLeft === "S") {
                    if (bottomRight !== "M") {
                        valid = false
                    }
                }
            } else {
                valid = false
            }
            if (topRight === "M" || topRight == "S") {
                if (topRight === "M") {
                    if (bottomLeft !== "S") {
                        valid = false
                    }
                }
                if (topRight === "S") {
                    if (bottomLeft !== "M") {
                        valid = false
                    }
                }
            } else {
                valid = false
            }
        } else {
            valid = false
        }
        if (valid) {
            counter += 1
        }
    }
}

console.log(counter)
