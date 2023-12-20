import * as THREE from 'three'
import getSize from '../utils/getSize'

export default function (scene: THREE.Scene, camera: THREE.Camera, props: any) {
  // 创建射线投射器
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  // 监听鼠标点击事件
  document.addEventListener('click', onMouseClick, false)

  function onMouseClick(event: any) {
    const { rect, width, height } = getSize(props)
    // 计算鼠标点击位置的归一化设备坐标
    mouse.x = ((event.clientX - rect.left) / width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / height) * 2 + 1

    // 更新射线投射器的原点和方向
    raycaster.setFromCamera(mouse, camera)

    // 检测与射线相交的对象
    const intersects = raycaster.intersectObjects(scene.children, true)

    // 如果有相交的对象
    if (intersects.length > 0) {
      // 获取第一个相交对象的面信息
      const object: any = intersects[0].object
      //   for (let i = 0; i < intersects.length; i++) {
      //     intersects[i].object.material.color.set(0xff0000)
      //   }

      // 获取材质的名称
      const materialName = object.material.name

      console.log('Clicked material:', materialName)
    }
  }
}
