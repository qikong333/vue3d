import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { Props } from '../type/props';
import useData from './useData';
export default function (scene: THREE.Scene) {
  const loader = new GLTFLoader();
  // const dracoLoader = new DRACOLoader()
  // dracoLoader.setDecoderPath('three/examples/jsm/libs/draco/')
  // dracoLoader.preload()
  // loader.setDRACOLoader(dracoLoader)
  const { model } = useData();

  function loadModel(inputData: { props: Props; loads: any }) {
    if (!inputData.props.url) {
      loadGeometry();
      return;
    }
    loadGLB(inputData);
  }

  // function loadFBX(inputData: { props: Props; loads: any }) {}
  // function loadOBJ(inputData: { props: Props; loads: any }) {}

  function loadGLB(inputData: { props: Props; loads: any }) {
    loader.load(
      inputData.props.url as string,
      // 'http://localhost:8085/v1/file/0130.glb',

      (gltf: any) => {
        // gltf.scene = gltf.scene.children[1]
        console.log(gltf, 'gltf.scene.name ');
        gltf.scene.name = model.value.name;
        // gltf.scene.name = model.value.name
        console.log(gltf.scene);

        // 获取模型中所有的网格
        gltf.scene.receiveShadow = true;
        gltf.scene.traverse((child: any) => {
          if (child.type === 'Mesh') {
            const material = child.material;
            console.log(material);
            if (material.map) {
              material.needsUpdate = true; // 更新材质
            }
          }
        });
        console.log(gltf);

        scene.add(gltf.scene);

        // inputData.props.emits && inputData.props.emits('afterLoadModel')
        inputData.props.callback?.afterLoadModel &&
          inputData.props.callback.afterLoadModel();
        inputData.loads.loadedModel = true;

        // 释放内存

        gltf.scene.traverse((object: any) => {
          if (object.isMesh) {
            const materials = Array.isArray(object.material)
              ? object.material
              : [object.material];
            materials.forEach((material: any) => {
              if (material.map) {
                material.map.dispose();
              }
              material.dispose();
            });
          }
        });

        gltf.scene.traverse((object: any) => {
          if (object.isMesh) {
            object.geometry.dispose();
          }
        });
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        inputData.loads.loading = (xhr.loaded / xhr.total) * 100;
      },
      (error) => {
        console.log(error);
      },
    );
  }

  function loadGeometry() {
    const geometry = new THREE.SphereGeometry(4, 45, 24);
    const material = new THREE.MeshPhysicalMaterial({});
    const sphere = new THREE.Mesh(geometry, material);
    sphere.name == model.value.name;
    scene.add(sphere);
  }

  function deleteModel() {
    const oldModel: any = scene.getObjectByName(model.value.name);
    // 从场景中移除旧的模型对象
    scene.remove(oldModel);
  }

  return { loadModel, deleteModel };
}
