export interface IPoint {
  x: number
  y: number
}

export function manhattanDistance(pointA: IPoint, pointB: IPoint): number {
  return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y)
}

export function areEqual(pointA: IPoint, pointB: IPoint): boolean {
  return pointA.x === pointB.x && pointA.y === pointB.y
}
