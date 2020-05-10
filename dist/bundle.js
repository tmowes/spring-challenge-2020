function manhattanDistance(pointA, pointB) {
    return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y);
}
function areEqual(pointA, pointB) {
    return pointA.x === pointB.x && pointA.y === pointB.y;
}

var inputs = readline().split(' ');
const width = parseInt(inputs[0]); // size of the grid
const height = parseInt(inputs[1]); // top left corner is (x=0, y=0)
for (let i = 0; i < height; i++) {
    const row = readline(); // one line of the grid: space " " is floor, pound "#" is wall
}
let oldPacPoint = { x: -1, y: -1 };
let bumpIterations = 1;
// game loop
while (true) {
    var inputs = readline().split(' ');
    const myScore = parseInt(inputs[0]);
    const opponentScore = parseInt(inputs[1]);
    const visiblePacCount = parseInt(readline()); // all your pacs and enemy pacs in sight
    let pacPoint;
    for (let i = 0; i < visiblePacCount; i++) {
        var inputs = readline().split(' ');
        const pacId = parseInt(inputs[0]); // pac number (unique within a team)
        const mine = inputs[1] !== '0'; // true if this pac is yours
        const x = parseInt(inputs[2]); // position in the grid
        const y = parseInt(inputs[3]); // position in the grid
        if (mine) {
            pacPoint = { x, y };
        }
        // const typeId: string = inputs[4] // unused in wood leagues
        // const speedTurnsLeft: number = parseInt(inputs[5]) // unused in wood leagues
        // const abilityCooldown: number = parseInt(inputs[6]) // unused in wood leagues
    }
    const visiblePelletCount = parseInt(readline()); // all pellets in sight
    let minDistance = Number.POSITIVE_INFINITY;
    let destinationPoint;
    let currentMinValue = 0;
    let pelletDistanceList = [];
    for (let i = 0; i < visiblePelletCount; i++) {
        var inputs = readline().split(' ');
        const x = parseInt(inputs[0]);
        const y = parseInt(inputs[1]);
        const pelletPoint = { x, y };
        const value = parseInt(inputs[2]); // amount of points this pellet is worth
        const pelletDistance = manhattanDistance(pacPoint, pelletPoint);
        if ((pelletDistance < minDistance || value > currentMinValue) &&
            !areEqual(pacPoint, oldPacPoint)) {
            currentMinValue = value;
            minDistance = pelletDistance;
            destinationPoint = pelletPoint;
        }
        else if (areEqual(pacPoint, oldPacPoint)) {
            pelletDistanceList.push({ pelletPoint, pelletDistance });
        }
    }
    if (!destinationPoint) {
        pelletDistanceList.sort((pelletA, pelletB) => pelletA.pelletDistance - pelletB.pelletDistance);
        destinationPoint = pelletDistanceList[bumpIterations].pelletPoint;
        bumpIterations++;
    }
    else {
        bumpIterations = 1;
    }
    console.log(`MOVE 0 ${destinationPoint.x} ${destinationPoint.y}`); // MOVE <pacId> <x> <y>
    oldPacPoint = pacPoint;
}
// Write an action using console.log()
// To debug: console.error('Debug messages...');
