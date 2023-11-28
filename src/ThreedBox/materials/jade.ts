export default {
  // transparent: true,
  // // precision: 'highp',
  // // color: '0xffffff',
  // reflectivity: 0, // 设置反射率
  // transmission: 0.35, // 设置透射率
  // emissive: 0xffffff,
  // emissiveIntensity: 0,
  // side: THREE.DoubleSide, // 设置多面渲染
  // // envMapIntensity: 2, // 设置环境贴图强度
  // // envMap: null,
  // depthWrite: true, // 深度写入开启
  // depthTest: true, // 深度测试开启
  // dithering: true, // 抖动开启
  // refractionRatio: 0.38, // 设置折射率
  // clearcoatNormalScale: new THREE.Vector2(1, 1), // 透明面漆法线贴图缩放
  // normalScale: new THREE.Vector2(0, 0), // 法线贴图缩放
  // displacementScale: 0.4, // 置换贴图缩放
  // shadowSide: THREE.DoubleSide,
  // opacity: 1,
  // // lightMapIntensity: 0.5,
  // // flatShading: true,
  // alphaTest: 0.5,
  // roughness: 0.6, // 设置粗糙度（0到1之间的值，0表示最光滑，1表示最粗糙）
  // metalness: 0.4, // 设置金属度（0到1之间的值，0表示非金属，1表示完全金属）
  // clearcoat: 0, // 设置透明面漆层的厚度（0到1之间的值，0表示没有，1表示完全厚度）
  // clearcoatRoughness: 0, // 设置透明面漆层的粗糙度（0到1之间的值，0表示最光滑，1表示最粗糙）
  roughness: 0.6,
  physical: true,
  clearcoatRoughness: 0.42,
  clearcoat: 0.84,
  envMapIntensity: 1.5,
  emissiveIntensity: 0.5,
  reflectivity: 0.74,
};
