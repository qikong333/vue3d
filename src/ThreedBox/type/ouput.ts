import { CameraType } from './output/CameraType'
import { MaterialType } from './output/MaterialType'
import { ModelsType } from './output/ModelsType'
import { RenderType } from './output/RenderType'

export type THREEDBOX = CameraType & MaterialType & RenderType & ModelsType
