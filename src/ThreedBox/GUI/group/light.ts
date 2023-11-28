import * as dat from 'dat.gui';

export default (gui: dat.GUI, { ambientLight }: any) => {
  const params = {
    'Light Intensity': ambientLight.intensity,
    Color: ambientLight.color.getHex(),
    img: '',
  };
  const group = gui.addFolder('Litht');
  group.add(params, 'Light Intensity', 0, 2).onChange((value) => {
    ambientLight.intensity = value;
  });

  group.addColor(params, 'Color').onChange((value) => {
    ambientLight.color.setHex(value);
  });

  group.add(params, 'img');
};
