import { ref, watchEffect } from 'vue'

export default () => {
  // const { loadModel } = useModels()
  const canvas = ref({
    id: ''
  })
  const model = ref({
    name: 'model',
    url: ''
  })

  watchEffect(() => {
    if (model.value.url) {
      // loadModel()
    }
  })

  function setCanvas(v: any) {
    canvas.value = v
  }

  return {
    model,
    canvas,
    setCanvas
  }
}
