import CANNON from 'cannon'

export default () => {
  /**
   * Physics
   */
  const world = new CANNON.World()
  world.gravity.set(0, -9.82, 0)

  // 创建 Cannon.js 刚体和碰撞形状
  const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
  const body = new CANNON.Body({ mass: 1 })
  body.addShape(shape)
  body.position.set(0, 5, 0)
  world.addBody(body)

  return {
    world,
    body
  }
}
