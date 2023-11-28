import { ref, watchEffect } from 'vue';

export default () => {
  // const { loadModel } = useModels()
  const canvas = ref({
    id: '',
  });
  const model = ref({
    name: 'model',
    url: '',
  });

  watchEffect(() => {
    if (model.value.url) {
      console.log(model.value.name);
      console.log('11112123123123');
      console.log(model.value.url);

      // loadModel()
    }
  });

  function setCanvas(v: any) {
    canvas.value = v;
  }

  return {
    model,
    canvas,
    setCanvas,
  };
};
