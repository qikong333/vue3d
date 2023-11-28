import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

import { Props } from '../type/props';
import getSize from '../utils/getSize';

export default function (renderer: THREE.WebGLRenderer, props: Props) {
  const size = getSize(props);

  const camera = new THREE.PerspectiveCamera(15, size.width / size.height, 0.1, 1000);
  camera.position.z = 5;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  controls.enablePan = true;
  controls.rotateSpeed = 0.5;
  // controls.autoRotate = props?.camera?.autoRotate
  // controls.maxZoom = controls.maxDistance = 2.0
  // controls.minZoom = 1.0
  controls.zoomSpeed = 2;
  controls.update();

  function setY(t: number) {
    const radius = camera.position.distanceTo(controls.target); // 获取相机到目标点的距离

    camera.position.x = controls.target.x + radius * Math.sin(Math.PI / t); // 沿着y旋转90度
    camera.position.z = controls.target.z + radius * Math.cos(Math.PI / t);
    camera.lookAt(controls.target); // 让相机朝向目标点
  }

  function setX(t: number) {
    const radius = camera.position.distanceTo(controls.target); // 获取相机到目标点的距离

    camera.position.y = controls.target.y + radius * Math.sin(Math.PI / t); // 沿着x旋转90度
    camera.position.z = controls.target.z + radius * Math.cos(Math.PI / t);
    camera.lookAt(controls.target); // 让相机朝向目标点
  }

  function setCameraValue(
    direction: 'Top' | 'Bottom' | 'Front' | 'Back' | 'Left' | 'Right',
  ) {
    controls.reset();
    let t = 0;
    switch (direction) {
      case 'Front':
        controls.reset();
        break;
      case 'Back':
        t = 1;
        setY(t);
        break;
      case 'Left':
        t = -2;
        setY(t);
        break;
      case 'Right':
        t = 2;
        setY(t);
        break;

      case 'Top':
        t = 2;
        setX(t);
        break;

      case 'Bottom':
        t = -2;
        setX(t);
        break;

      default:
        break;
    }
  }

  function setFov(v: any) {
    camera.fov = v;
    camera.updateProjectionMatrix();
  }
  return {
    camera,
    controls,
    setCameraValue,
    setFov,
  };
}
