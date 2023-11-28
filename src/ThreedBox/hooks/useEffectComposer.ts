import * as THREE from 'three';
import {
  // SMAAPass,
  // GlitchPass,
  // BokehPass,
  // FilmPass,
  // SSAOPass,
  OutputPass,
  RenderPass,
  TAARenderPass,
  UnrealBloomPass,
} from 'three/examples/jsm/Addons.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';

import getSize from '../utils/getSize';
export default (renderer: any, scene: any, camera: any, props: any) => {
  const size = getSize(props);
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  renderPass.enabled = true;
  composer.setPixelRatio(window.devicePixelRatio);
  composer.setSize(size.width, size.height);
  composer.setPixelRatio(window.devicePixelRatio);
  composer.setSize(window.innerWidth, window.innerHeight);
  // const smaaPass = new SMAAPass(size.width, size.height)
  // const glitchPass = new GlitchPass()
  // const bokehPass = new BokehPass(scene, camera, {})
  // const filmPass = new FilmPass()
  // const sSAOPass = new SSAOPass(scene, camera, size.width, size.height)
  const outputPass = new OutputPass();
  const taaRenderPass = new TAARenderPass(scene, camera);
  taaRenderPass.unbiased = false;

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85,
  );
  bloomPass.threshold = 0.23;
  bloomPass.strength = 0.235;
  bloomPass.radius = 0;

  // composer.addPass(smaaPass)
  composer.addPass(renderPass);
  // composer.addPass(bloomPass)
  composer.addPass(outputPass);

  return {
    composer,
  };
};
