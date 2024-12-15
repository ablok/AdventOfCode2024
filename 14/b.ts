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

for (let i = 1; i <= 10000; i++) {
    robots.forEach((robot) => {
        move(robot);
    });

    let output = "";
    for (let row = 0; row < grid.rows; row++) {
        let rowString = "";
        for (let column = 0; column < grid.columns; column++) {
            const robot = robots.find((robot) => robot.position.x === column && robot.position.y === row);
            if (robot) {
                rowString = `${rowString}X`;
            } else {
                rowString = `${rowString} `;
            }
        }
        output = `${output}${rowString}\n`;
    }

    if (output.match(/XXXXXXXXXX/g)) {
        fs.writeFileSync(`14/output/${i}.txt`, output);
        break;
    }
}

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
