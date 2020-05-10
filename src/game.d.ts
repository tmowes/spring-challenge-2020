import { IPoint } from './geometry'

export interface IPac {
  position: IPoint
  id: number
}

export interface IPelletDistanceList {
  pelletPoint: IPoint
  pelletDistance: number
}

export interface IPacOrder {
  id: number
  destinationPoint: IPoint
  distance: number
  value: number
  pelletDistanceList: IPelletDistanceList[]
}
