import * as dat from 'dat.gui'
import { ref } from 'vue'

import light from './group/light'

export default (props: any) => {
  const guiContainerRef = ref()

  const gui = new dat.GUI()
  const guiContainer = document.createElement('div')

  light(gui, props)

  guiContainerRef.value = guiContainer
  document.body.appendChild(guiContainer)
  guiContainer.appendChild(gui.domElement)

  // 添加样式
  guiContainer.style.position = 'fixed'
  guiContainer.style.top = '0px'
  guiContainer.style.right = '0px'
  guiContainer.style.zIndex = '9999'
}

// const imageControl = {
//     setImage: () => {
//       const input = document.createElement('input');
//       input.type = 'file';
//       input.accept = 'image/*';
//       input.addEventListener('change', (event:any) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           imageSrc.value = e.target.result;
//         };
//         reader.readAsDataURL(file);
//       });
//       input.click();
//     },
//   };
