export interface CameraType {
  /**
   * @name 设置相机方向
   * @param direction 相机方向，可选值为 'Top' | 'Bottom' | 'Front' | 'Back' | 'Left' | 'Right'
   */
  setCameraDirection: (direction: 'Top' | 'Bottom' | 'Front' | 'Back' | 'Left' | 'Right') => void

  /**
   * @name 设置相机距离
   * @param value 相机与物体之间的距离的值 number
   * @returns
   */
  setCameraFov: (value: number) => void
}
