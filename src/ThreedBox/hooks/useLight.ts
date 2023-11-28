import * as THREE from 'three';
import { Scene } from 'three';
import { ref } from 'vue';

export default function (scene: Scene) {
  // 调整光照和阴影
  const pointLight = ref(new THREE.PointLight(0xffffff, 0.5, 90));
  pointLight.value.name = 'pointLight';
  pointLight.value.position.set(0, 5, -15);
  // scene.add(pointLight.value)

  // 创建漫反射光源
  const diffuseLight = ref(new THREE.DirectionalLight(0xffffff, 0.8));
  diffuseLight.value.position.set(0, 1, 0);
  scene.add(diffuseLight.value);

  // 创建环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.45);
  scene.add(ambientLight);

  // 聚光灯
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x080820, 0.8);
  // const helper = new THREE.HemisphereLightHelper(hemisphereLight, 5)
  scene.add(hemisphereLight);
  // scene.add(helper)

  // 创建平行光源
  const shadowLight = ref(new THREE.DirectionalLight(0xffffff, 0.8));
  shadowLight.value.position.set(10, 0, 10);
  shadowLight.value.target.position.set(0, 0, 0);
  shadowLight.value.castShadow = true;
  shadowLight.value.shadow.mapSize.width = 2048;
  shadowLight.value.shadow.mapSize.height = 2048;
  shadowLight.value.shadow.camera.near = 0.5;
  shadowLight.value.shadow.camera.far = 50;
  shadowLight.value.shadow.camera.left = -30;
  shadowLight.value.shadow.camera.right = 30;
  shadowLight.value.shadow.camera.top = 30;
  shadowLight.value.shadow.camera.bottom = -30;
  scene.add(shadowLight.value);

  function setLightValue({
    value,
    // type,
    key,
  }: {
    value: any;
    type: string;
    key: string;
  }) {
    let v: any;
    // const light = scene.getObjectByName(type)
    v[key] = value;
  }

  function setSkyColor(color: string) {
    scene.traverse((obj: any) => {
      if (obj.type === 'HemisphereLight') {
        obj.color = new THREE.Color(color);
      }
    });
  }
  function setGroundColor(color: string) {
    scene.traverse((obj: any) => {
      if (obj.type === 'HemisphereLight') {
        obj.groundColor = new THREE.Color(color);
      }
    });
  }
  function setPostiont(n: number, t: string) {
    scene.traverse((obj: any) => {
      if (obj.type === 'HemisphereLight') {
        obj.position[t] = n;
      }
    });
  }

  return {
    setPostiont,
    setSkyColor,
    setGroundColor,
    setLightValue,
    diffuseLight,
    shadowLight,
    ambientLight,
    hemisphereLight,
  };
}
