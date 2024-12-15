import fs from "node:fs";

type Robot = {
    position: {
        x: number;
        y: number;
    };
    velocity: {
        x: number;
        y: number;
    };
};

const grid = { rows: 103, columns: 101 };

const robots: Robot[] = fs
    .readFileSync("14/input.txt", { encoding: "utf8" })
    .split("\n")
    .map((line) => {
        return {
            position: {
                x: Number(line.substring(line.indexOf("p=") + 2, line.indexOf(","))),
                y: Number(line.substring(line.indexOf(",") + 1, line.indexOf(" "))),
            },
            velocity: {
                x: Number(line.substring(line.indexOf("v=") + 2, line.lastIndexOf(","))),
                y: Number(line.substring(line.lastIndexOf(",") + 1)),
            },
        };
    });

for (let i = 1; i <= 100; i++) {
    robots.forEach((robot) => {
        move(robot);
    });
}

const quadrants = [0, 0, 0, 0];
for (let i = 0; i <= quadrants.length - 1; i++) {
    let column0: number;
    let column1: number;
    let row0: number;
    let row1: number;

    switch (i) {
        case 0:
            column0 = 0;
            column1 = Math.floor(grid.columns / 2) - 1;
            row0 = 0;
            row1 = Math.floor(grid.rows / 2) - 1;
            break;
        case 1:
            column0 = Math.floor(grid.columns / 2) + 1;
            column1 = grid.columns - 1;
            row0 = 0;
            row1 = Math.floor(grid.rows / 2) - 1;
            break;
        case 2:
            column0 = 0;
            column1 = Math.floor(grid.columns / 2) - 1;
            row0 = Math.floor(grid.rows / 2) + 1;
            row1 = grid.rows - 1;
            break;
        case 3:
            column0 = Math.floor(grid.columns / 2) + 1;
            column1 = grid.columns - 1;
            row0 = Math.floor(grid.rows / 2) + 1;
            row1 = grid.rows - 1;
            break;
    }

    quadrants[i] = robots.filter((robot) => {
        if (
            robot.position.x >= column0 &&
            robot.position.x <= column1 &&
            robot.position.y >= row0 &&
            robot.position.y <= row1
        ) {
            return robot;
        }
    }).length;
}

const result = quadrants.reduce((total, value) => (total = total * value), 1);
console.log(result);

function move(robot: Robot) {
    let newX = robot.position.x + robot.velocity.x;
    if (newX > grid.columns - 1) {
        newX = newX - grid.columns;
    }
    if (newX < 0) {
        newX = grid.columns - Math.abs(newX);
    }

    let newY = robot.position.y + robot.velocity.y;
    if (newY > grid.rows - 1) {
        newY = newY - grid.rows;
    }
    if (newY < 0) {
        newY = grid.rows - Math.abs(newY);
    }

    robot.position.x = newX;
    robot.position.y = newY;
}
