import { onDeactivated, reactive, watchEffect } from 'vue'

import useGUI from './GUI'
import useCamera from './hooks/useCamera'
import useData from './hooks/useData'
import useLight from './hooks/useLight'
import useMaterial from './hooks/useMaterial'
import useModels from './hooks/useModels'
import useRender from './hooks/useRender'
import useScene from './hooks/useScene'
import { Props } from './type/props'
import getSize from './utils/getSize'
import useRaycaster from './hooks/useRaycaster'

export default (props: Props) => {
  const size = getSize(props)

  const loads = reactive({
    loading: 0,
    loadedModel: false,
    loadedMaterial: false
  })

  // const props = reactive<Props>(prop)

  const { renderer, screenshot } = useRender(props)
  const div = document.createElement('div')
  div.style.width = size.width + 'px'
  div.style.height = size.height + 'px'
  div.style.position = 'relative'

  div.appendChild(renderer.domElement)

  const { scene, changeSceneBg } = useScene()
  const { ambientLight, hemisphereLight, diffuseLight } = useLight(scene)
  const { camera, controls, setCameraDirection, setCameraFov } = useCamera(renderer, props)
  const { loadModel, getMaterialNames } = useModels(scene, div)
  loadModel({ props, loads })

  const useMaterialFunc = useMaterial({
    scene,
    props,
    loads,
    div
  })
  const { MaterialRender, SingleRender } = useMaterialFunc

  watchEffect(() => {
    if (loads.loadedModel) {
      if (Array.isArray(props.material)) {
        MaterialRender(props.material)
      } else {
        SingleRender(props.material)
      }
    }

    // if (props.material) {
    // }
  })

  // const geometry = new THREE.BoxGeometry(1, 1, 1)
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  // const cube = new THREE.Mesh(geometry, material)
  // scene.add(cube)

  changeSceneBg({
    value: '#fff',
    type: 'color'
  })

  useRaycaster(scene, camera, props)

  // const { composer } = useEffectComposer(renderer, scene, camera, props)

  function animate() {
    requestAnimationFrame(animate)
    controls.update()

    renderer.render(scene, camera)
    // composer.render()
  }

  animate()
  if (props.id) {
    document.getElementById(props.id)?.appendChild(div)
  }

  onWindowResize()
  window.addEventListener('resize', onWindowResize)
  function onWindowResize() {
    // // 获取窗口的宽度和高度
    // const width = size.width
    // const height = size.height
    // // 调整画布的大小
    // renderer.setSize(width, height)
    // //  更新相机的宽高比
    // if (camera) {
    //     camera.aspect = width / height
    //     camera.updateProjectionMatrix()
    // }

    props.GUI &&
      useGUI({
        ambientLight,
        camera,
        controls,
        hemisphereLight,
        diffuseLight,
        scene,
        renderer
      })
  }

  // 销毁
  onDeactivated(() => {
    console.log(11111321)
    renderDispose()
  })

  function renderDispose() {
    console.log(11111321)

    scene.children.forEach(function (object) {
      scene.remove(object)
    })
    renderer.forceContextLoss()
  }

  return {
    useData: useData(),
    screenshot: () => screenshot(scene, camera),
    ...useMaterialFunc,
    setCameraDirection,
    setCameraFov,
    getMaterialNames
  }
}
