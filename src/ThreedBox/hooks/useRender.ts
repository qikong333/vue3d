import * as THREE from 'three';

import { Props } from '../type/props';
import getSize from '../utils/getSize';

export default (props: Props) => {
  const size = getSize(props);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
    precision: 'highp',
  });

  renderer.info.autoReset = false;
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.toneMappingExposure = 1;
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.sortObjects = true;
  renderer.toneMapping = THREE.LinearToneMapping; // 线性色调映射
  renderer.toneMappingExposure = 0.95; // 曝光度
  // 启用阴影，调整阴影类型
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer?.setSize(size.width, size.height);

  function screenshot(scene: THREE.Scene, camera: THREE.Camera): string {
    renderer?.render(scene, camera); //此处renderer为three.js里的渲染器，scene为场景 camera为相机
    const imgData = renderer?.domElement.toDataURL('image/jpeg'); //这里可以选择png格式jpeg格式
    const image = new Image();
    image.src = imgData;
    document.body.appendChild(image);
    return imgData;
  }
  return { renderer, screenshot };
};
