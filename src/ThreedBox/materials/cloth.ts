import * as THREE from 'three';

export default {
  transparent: true,
  precision: 'highp',
  metalness: 0, // 设置金属度
  roughness: 1, // 设置粗糙度
  clearcoat: 0.4, // 设置透明面漆厚度
  // color: '0xffffff',
  clearcoatRoughness: 1, // 设置透明面漆粗糙度
  reflectivity: 0, // 设置反射率
  transmission: 0, // 设置透射率
  // emissive: 0xffffff,
  emissiveIntensity: 0,
  side: THREE.DoubleSide, // 设置多面渲染
  // envMapIntensity: 2, // 设置环境贴图强度
  // envMap: null,
  depthWrite: true, // 深度写入开启
  depthTest: true, // 深度测试开启
  dithering: true, // 抖动开启
  clearcoatNormalScale: new THREE.Vector2(1, 1), // 透明面漆法线贴图缩放
  normalScale: new THREE.Vector2(1, 1), // 法线贴图缩放
  displacementScale: 0.4, // 置换贴图缩放
  shadowSide: THREE.DoubleSide,
  opacity: 1,
  // lightMapIntensity: 0.5,
  // flatShading: true,
};
