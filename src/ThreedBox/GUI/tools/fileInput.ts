import * as THREE from 'three';

export default (fn: any) => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.addEventListener('change', function (event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', function (event: any) {
      const texture = new THREE.Texture();
      texture.image = new Image();
      texture.image.src = event.target.result;
      texture.needsUpdate = true;

      // 将新的贴图应用到材质
      fn(texture);

      // // 更新参数对象
      // params.texture = texture;
    });

    reader.readAsDataURL(file);
  });
};
