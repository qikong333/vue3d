import * as THREE from 'three';

export default function () {
  // const scene = ref(new THREE.Scene())
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const changeSceneBg = ({ value, type }: { value: string; type: 'color' | 'img' }) => {
    switch (type) {
      case 'color':
        scene.background = new THREE.Color(value);
        break;

      case 'img':
        // eslint-disable-next-line no-case-declarations
        const texture = new THREE.TextureLoader().load(value);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        scene.background = texture;
        break;

      default:
        break;
    }
  };
  return { scene, changeSceneBg };
}
