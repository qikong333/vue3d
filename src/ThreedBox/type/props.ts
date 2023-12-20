import { MaterialProps } from './materialProps'

export interface Props {
  id?: string
  width?: number
  height?: number
  url: string
  callback?: {
    afterLoadModel?: () => void
    afterLoadMaterial?: () => void
  }
  canvas?: {
    id: string
    width: number
    height: number
  }
  material?: MaterialProps | MaterialProps[]
  model?: {
    url: string
  }
  GUI?: boolean
}
