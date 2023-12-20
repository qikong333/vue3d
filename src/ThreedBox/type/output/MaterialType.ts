import { MaterialProps } from '../materialProps'

export interface MaterialType {
  /**
   * @name 多面材质渲染
   * @param MaterialProps[]
   * @returns
   */
  MaterialRender: (arr: MaterialProps[]) => void

  /**
   * @name 单面材质渲染
   * @param MaterialProps
   * @returns Promise<void>
   */
  SingleRender: (params: MaterialProps) => Promise<void>

  /**
   * @name 渲染画布贴图
   * @param name 材质名称
   * @param canvas 画布的HTMLCanvasElement
   * @returns
   */
  setCanvasTexture: (name: string, canvas: HTMLCanvasElement) => void
}
