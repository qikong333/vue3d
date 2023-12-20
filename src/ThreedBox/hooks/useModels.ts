import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { Props } from '../type/props'
import useData from './useData'
import { ref, watchEffect } from 'vue'
import useLoading from './useLoading'
export default function (scene: THREE.Scene, div: Element) {
  // 创建加载管理器
  const loadingManager = new THREE.LoadingManager()

  const loader = new GLTFLoader(loadingManager)
  let materialNames: any[] = []

  const UseLoading = useLoading(div)
  UseLoading.create()

  let progress = ref(0)

  // 监听进度事件
  loadingManager.onProgress = function (_, loaded, total) {
    progress.value = Math.round((loaded / total) * 100)
    console.log(progress)

    UseLoading.del()
  }

  watchEffect(() => {
    if (progress.value === 100) {
      console.log('progress === 100')
    }
  })

  const { model } = useData()

  function loadModel(inputData: { props: Props; loads: any }) {
    if (!inputData.props.url) {
      return
    }
    materialNames = []
    loadGLB(inputData)
  }

  // function loadFBX(inputData: { props: Props; loads: any }) {}
  // function loadOBJ(inputData: { props: Props; loads: any }) {}

  function loadGLB(inputData: { props: Props; loads: any }) {
    loader.load(
      inputData.props.url as string,
      // 'http://localhost:8085/v1/file/0130.glb',

      (gltf: any) => {
        // gltf.scene = gltf.scene.children[1]
        // console.log(gltf, 'gltf.scene.name ')
        gltf.scene.name = model.value.name
        // gltf.scene.name = model.value.name
        // console.log(gltf.scene)

        // 获取模型中所有的网格
        gltf.scene.receiveShadow = true
        gltf.scene.traverse((child: any) => {
          if (child.type === 'Mesh') {
            // const material = child.material
            // console.log(material)
            // child.material.color = new THREE.Color('#ffffff')
            // child.material.transparent = false
            // child.material.opacity = 1

            materialNames.push(child.material.name)
            child.material = new THREE.MeshPhysicalMaterial({
              color: new THREE.Color('#ffffff'),
              name: child.material.name
            })
            child.material.needsUpdate = true
            // if (material.map) {
            //   material.needsUpdate = true // 更新材质
            // }
          }
        })
        // console.log(gltf)

        scene.add(gltf.scene)

        // progressElement.style.display = 'none' // 加载完成后隐藏进度显示

        // inputData.props.emits && inputData.props.emits('afterLoadModel')
        inputData.props.callback?.afterLoadModel && inputData.props.callback.afterLoadModel()
        inputData.loads.loadedModel = true

        // 释放内存

        gltf.scene.traverse((object: any) => {
          if (object.isMesh) {
            const materials = Array.isArray(object.material) ? object.material : [object.material]
            materials.forEach((material: any) => {
              if (material.map) {
                material.map.dispose()
              }
              material.dispose()
            })
          }
        })

        gltf.scene.traverse((object: any) => {
          if (object.isMesh) {
            object.geometry.dispose()
          }
        })
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        inputData.loads.loading = (xhr.loaded / xhr.total) * 100
      },
      (error) => {
        console.log(error)
      }
    )
  }

  function deleteModel() {
    const oldModel: any = scene.getObjectByName(model.value.name)
    // 从场景中移除旧的模型对象
    scene.remove(oldModel)
  }

  function getMaterialNames(): string[] {
    return materialNames
  }

  return { loadModel, deleteModel, getMaterialNames }
}
