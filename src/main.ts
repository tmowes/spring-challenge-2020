import { IPoint, manhattanDistance, areEqual } from './geometry'
import { IPac, IPacOrder } from './game'

var inputs: string[] = readline().split(' ')
const width: number = parseInt(inputs[0]) // size of the grid
const height: number = parseInt(inputs[1]) // top left corner is (x=0, y=0)
for (let i = 0; i < height; i++) {
  const row: string = readline() // one line of the grid: space " " is floor, pound "#" is wall
}

let oldpacList: IPac[] = []
let bumpIterations: number[] = []

// game loop
while (true) {
  var inputs: string[] = readline().split(' ')
  const myScore: number = parseInt(inputs[0])
  const opponentScore: number = parseInt(inputs[1])
  const visiblePacCount: number = parseInt(readline()) // all your pacs and enemy pacs in sight

  let pacList: IPac[] = []

  for (let i = 0; i < visiblePacCount; i++) {
    var inputs: string[] = readline().split(' ')
    const pacId: number = parseInt(inputs[0]) // pac number (unique within a team)
    const mine: boolean = inputs[1] !== '0' // true if this pac is yours
    const x: number = parseInt(inputs[2]) // position in the grid
    const y: number = parseInt(inputs[3]) // position in the grid
    if (mine) {
      pacList.push({ id: pacId, position: { x, y } })
    }
    // const typeId: string = inputs[4] // unused in wood leagues
    // const speedTurnsLeft: number = parseInt(inputs[5]) // unused in wood leagues
    // const abilityCooldown: number = parseInt(inputs[6]) // unused in wood leagues
  }
  const visiblePelletCount: number = parseInt(readline()) // all pellets in sight

  let pacOrders: IPacOrder[] = pacList.map(pac => {
    return {
      id: pac.id,
      destinationPoint: null,
      distance: Number.POSITIVE_INFINITY,
      value: 0,
      pelletDistanceList: [],
    }
  })

  for (let i = 0; i < visiblePelletCount; i++) {
    var inputs: string[] = readline().split(' ')
    const x: number = parseInt(inputs[0])
    const y: number = parseInt(inputs[1])
    const pelletPoint: IPoint = { x, y }
    const value: number = parseInt(inputs[2]) // amount of points this pellet is worth
    for (let j = 0; j < pacList.length; j++) {
      const pelletDistance = manhattanDistance(pacList[j].position, pelletPoint)
      if (
        (pelletDistance < pacOrders[j].distance ||
          value > pacOrders[j].value) &&
        (!oldpacList[j] ||
          !areEqual(pacList[j].position, oldpacList[j].position))
      ) {
        pacOrders[j].value = value
        pacOrders[j].distance = pelletDistance
        pacOrders[j].destinationPoint = pelletPoint
      } else if (
        oldpacList[j] &&
        areEqual(pacList[j].position, oldpacList[j].position)
      ) {
        pacOrders[j].pelletDistanceList.push({ pelletPoint, pelletDistance })
      }
    }
  }
  for (let i = 0; i < pacOrders.length; i++) {
    if (!pacOrders[i].destinationPoint) {
      pacOrders[i].pelletDistanceList.sort(
        (pelletA, pelletB) => pelletA.pelletDistance - pelletB.pelletDistance,
      )
      pacOrders[i].destinationPoint =
        pacOrders[i].pelletDistanceList[bumpIterations[i]].pelletPoint
      bumpIterations[i]++
    } else {
      bumpIterations[i] = 1
    }
  }

  console.log(
    pacOrders
      .map(
        pac =>
          `MOVE ${pac.id} ${pac.destinationPoint.x} ${pac.destinationPoint.y}`,
      )
      .join('|'),
  )
  oldpacList = pacList
}

// MOVE <pacId> <x> <y>
// Write an action using console.log()
// To debug: console.error('Debug messages...');
