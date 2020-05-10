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
let oldpacList = [];
let bumpIterations = [];
// game loop
while (true) {
    var inputs = readline().split(' ');
    const myScore = parseInt(inputs[0]);
    const opponentScore = parseInt(inputs[1]);
    const visiblePacCount = parseInt(readline()); // all your pacs and enemy pacs in sight
    let pacList = [];
    for (let i = 0; i < visiblePacCount; i++) {
        var inputs = readline().split(' ');
        const pacId = parseInt(inputs[0]); // pac number (unique within a team)
        const mine = inputs[1] !== '0'; // true if this pac is yours
        const x = parseInt(inputs[2]); // position in the grid
        const y = parseInt(inputs[3]); // position in the grid
        if (mine) {
            pacList.push({ id: pacId, position: { x, y } });
        }
        // const typeId: string = inputs[4] // unused in wood leagues
        // const speedTurnsLeft: number = parseInt(inputs[5]) // unused in wood leagues
        // const abilityCooldown: number = parseInt(inputs[6]) // unused in wood leagues
    }
    const visiblePelletCount = parseInt(readline()); // all pellets in sight
    let pacOrders = pacList.map(pac => {
        return {
            id: pac.id,
            destinationPoint: null,
            distance: Number.POSITIVE_INFINITY,
            value: 0,
            pelletDistanceList: [],
        };
    });
    for (let i = 0; i < visiblePelletCount; i++) {
        var inputs = readline().split(' ');
        const x = parseInt(inputs[0]);
        const y = parseInt(inputs[1]);
        const pelletPoint = { x, y };
        const value = parseInt(inputs[2]); // amount of points this pellet is worth
        for (let j = 0; j < pacList.length; j++) {
            const pelletDistance = manhattanDistance(pacList[j].position, pelletPoint);
            if ((pelletDistance < pacOrders[j].distance ||
                value > pacOrders[j].value) &&
                (!oldpacList[j] ||
                    !areEqual(pacList[j].position, oldpacList[j].position))) {
                pacOrders[j].value = value;
                pacOrders[j].distance = pelletDistance;
                pacOrders[j].destinationPoint = pelletPoint;
            }
            else if (oldpacList[j] &&
                areEqual(pacList[j].position, oldpacList[j].position)) {
                pacOrders[j].pelletDistanceList.push({ pelletPoint, pelletDistance });
            }
        }
    }
    for (let i = 0; i < pacOrders.length; i++) {
        if (!pacOrders[i].destinationPoint) {
            pacOrders[i].pelletDistanceList.sort((pelletA, pelletB) => pelletA.pelletDistance - pelletB.pelletDistance);
            pacOrders[i].destinationPoint =
                pacOrders[i].pelletDistanceList[bumpIterations[i]].pelletPoint;
            bumpIterations[i]++;
        }
        else {
            bumpIterations[i] = 1;
        }
    }
    console.log(pacOrders
        .map(pac => `MOVE ${pac.id} ${pac.destinationPoint.x} ${pac.destinationPoint.y}`)
        .join('|'));
    oldpacList = pacList;
}
// MOVE <pacId> <x> <y>
// Write an action using console.log()
// To debug: console.error('Debug messages...');
