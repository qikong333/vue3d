import * as THREE from 'three'

import cloth from '../materials/cloth'
import { MaterialProps } from '../type/materialProps'
import { Props } from '../type/props'
import useData from './useData'
import useLoading from './useLoading'
// import jade from '../materials/jade'

export default function (inputData: { scene: THREE.Scene; props: Props; loads: any; emits?: any; div: any }) {
  // const material = new THREE.MeshPhysicalMaterial({ color: 0x00ffff })
  // material.needsUpdate = true
  // material.side = THREE.DoubleSide

  const manager = new THREE.LoadingManager()
  const textureloader = new THREE.TextureLoader(manager)
  const { model } = useData()

  // 指定资源加载完成后的回调函数
  manager.onLoad = function () {
    // props.emits && props.emits('afterLoadMaterial')
  }

  function SingleRender(params: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const textrueMaps: { [key: string]: THREE.Texture } = {}

      // 处理map
      if (params?.maps) {
        const maps = Object.keys(params.maps)
        if (maps.length > 0) {
          Object.keys(params.maps).map((key) => {
            if (params.maps[key]) {
              textrueMaps[key] = textureloader.load(params.maps[key])
            }
          })

          setTexture(textrueMaps, params.textureAttributes)
        }
      }

      const mu: any = inputData.scene.getObjectByName(model.value.name)
      if (!mu) {
        reject(new Error('Object not found in scene.'))
        return
      }

      mu.traverse(function (obj: any) {
        if (obj.type === 'Mesh') {
          if (obj.material.name.includes(params?.name)) {
            let baseMaterial: any = newMaterial({
              ...textrueMaps,
              ...params.materialAttributes,
              name: obj.material.name
            })

            obj.material = baseMaterial
            obj.material.needsUpdate = true

            baseMaterial.dispose()
            baseMaterial = null
          }
        }
      })

      // 释放内存
      if (params?.maps) {
        Object.keys(params.maps).map((key) => {
          if (params.maps[key]) {
            textrueMaps[key].dispose()
          }
        })
      }

      resolve()
    })
  }

  // 全部面渲染
  function MaterialRender(arr: MaterialProps[]) {
    const UseLoading = useLoading(inputData.div)
    UseLoading.create()
    const promises = arr.map((r) => SingleRender(r))
    Promise.all(promises).then(() => {
      //TODO  callback 监听渲染完成
      inputData.props.callback?.afterLoadMaterial && inputData.props.callback?.afterLoadMaterial()
      UseLoading.del()
    })
  }

  function setMaterialKey({ key, value, name }: { key: string; value: any; name: string }) {
    const mu: any = inputData.scene.getObjectByName(model.value.name)

    if (mu) {
      mu.traverse(function (obj: any) {
        if (obj.type === 'Mesh') {
          if (obj.material.name.includes(name)) {
            console.log(value)
            console.log(obj.material[key])

            obj.material['color'] = null
            obj.material[key] = value
            obj.material.map.needsUpdate = true
            obj.material.needsUpdate = true

            console.log(obj.material)
          }
        }
      })
    }
  }

  function setMapKey({ key, value, name }: any) {
    console.log(key, value, name)
    value = new THREE.Vector2(0, 0)
    const mu: any = inputData.scene.getObjectByName(model.value.name)
    if (mu) {
      mu.traverse(function (obj: any) {
        if (obj.type === 'Mesh') {
          if (obj.material.name.includes(name)) {
            // obj.material.map[key] = value
            // obj.material.map[key].set(0.5, 0)
            obj.material.map.offset = value
            obj.material.aoMap.offset = value
            // obj.material.map[key].set(value, 0)
            // obj.material.aoMap[key].set(value, 0)
            obj.material.map.needsUpdate = true
            obj.material.aoMap.needsUpdate = true
            obj.material.needsUpdate = true
            console.log(obj)
          }
        }
      })
    }
  }

  function newMaterial(data: any) {
    return new THREE.MeshPhysicalMaterial({
      ...cloth,
      // ...jade,

      ...data
    })
  }

  function setTexture(maps: { [key: string]: THREE.Texture }, textureAttributes: any) {
    Object.values(maps).map((v: any) => {
      v.center = new THREE.Vector2(0.5, 0.5) // 对应纹理的正中心
      v.flipY = false
      v.wrapS = THREE.RepeatWrapping
      v.wrapT = THREE.RepeatWrapping
      v.repeat = new THREE.Vector2(4, 4)
      v.generateMipmaps = true
      v.unpackAlignment = 2
      v.matrixAutoUpdate = true
      // v.offset = new THREE.Vector2(1, 1)
      v.magFilter = THREE.NearestFilter
      v.premultiplyAlpha = false
      v.mapping = THREE.CubeUVReflectionMapping
      v.anisotropy = 16
      v.needsUpdate = true
      // v.magFilter = THREE.LinearFilter
      // v.minFilter = THREE.LinearFilter
      v.generateMipmaps = true
      v.repeat = new THREE.Vector2(1, 1)

      if (textureAttributes) {
        const attrKey = Object.keys(textureAttributes)
        if (attrKey.length > 0) {
          attrKey.map((key) => {
            v[key] = textureAttributes[key]
          })
        }
      }
    })
  }

  // function setTexture(
  //     objs: { [key: string]: THREE.Texture },
  //     repeat: THREE.Vector2 | number,
  //     offsetX?: number
  // ) {
  //     const repeatValue =
  //         typeof repeat === 'number'
  //             ? new THREE.Vector2(repeat, repeat)
  //             : repeat
  //     const keys = Object.keys(objs)
  //     keys.map(key => {
  //         const r = objs[key]
  //         if (r) {
  //             r.center = new THREE.Vector2(0.5, 0.5) // 对应纹理的正中心
  //             r.flipY = false
  //             r.wrapS = THREE.RepeatWrapping
  //             r.wrapT = THREE.RepeatWrapping
  //             r.repeat = repeatValue
  //             r.generateMipmaps = true
  //             r.unpackAlignment = 2
  //             r.matrixAutoUpdate = true
  //             r.offset = new THREE.Vector2(offsetX || 0, 0)
  //             r.magFilter = THREE.NearestFilter
  //             r.premultiplyAlpha = false
  //             r.mapping = THREE.CubeUVReflectionMapping
  //             r.anisotropy = 16
  //             r.needsUpdate = true
  //         }
  //     })
  // }

  function setMaterialColor(color: string, name?: string) {
    const mu: any = inputData.scene.getObjectByName(model.value.name)

    if (mu) {
      mu.traverse(function (obj: any) {
        if (obj.type === 'Mesh') {
          if (name) {
            if (obj.material.name.includes(name)) {
              obj.material.color = new THREE.Color(color)
            }
          } else {
            obj.material.color = new THREE.Color(color)
          }
        }
      })
    }
  }

  function setCanvasTexture(name: string, canvas: HTMLCanvasElement) {
    const texture = new THREE.CanvasTexture(canvas)

    texture.flipY = false
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    // texture.repeat = new THREE.Vector2(4, 4)
    // r.cenb ter = new THREE.Vector2(0.4, 0.4)
    // r.magFilter = THREE.NearestFilter
    // r.premultiplyAlpha = true
    texture.generateMipmaps = true
    texture.unpackAlignment = 2

    const mu: any = inputData.scene.getObjectByName(model.value.name)
    mu?.traverse((obj: any) => {
      if (obj.type === 'Mesh') {
        if (obj.material.name.includes(name)) {
          obj.material.map = texture
          obj.material.needsUpdate = true
        }
      }
    })

    setTimeout(() => {
      texture.dispose()
    }, 1000)
  }

  function setMaterialButton({ map }: any, name: string) {
    // console.log(map)
    // console.log(name)

    textureloader.load(map, (r) => {
      r.center = new THREE.Vector2(0.5, 0.5) // 对应纹理的正中心
      r.flipY = false
      r.wrapS = THREE.RepeatWrapping
      r.wrapT = THREE.RepeatWrapping

      r.generateMipmaps = true
      r.unpackAlignment = 2
      r.matrixAutoUpdate = true
      // r.offset = new THREE.Vector2(0, 0)
      r.magFilter = THREE.NearestFilter
      r.premultiplyAlpha = false
      r.mapping = THREE.CubeUVReflectionMapping
      r.anisotropy = 16
      r.repeat = new THREE.Vector2(1.5, 1.5)
      r.needsUpdate = true

      const mu: any = inputData.scene.getObjectByName(model.value.name)
      mu?.traverse((obj: any) => {
        if (obj.type === 'Mesh') {
          if (obj.material.name.includes(name)) {
            obj.material.map = r
            obj.material.needsUpdate = true // 需要更新材质
          }
        }
      })
    })
  }

  return {
    // material,
    setMapKey,
    setMaterialButton,
    // setMaterial,
    setMaterialColor,
    setCanvasTexture,
    setMaterialKey,
    MaterialRender,
    SingleRender
  }
}
