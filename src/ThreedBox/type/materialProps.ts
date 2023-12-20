export interface MaterialProps {
  maps?: {
    alphaMap?: string
    aoMap?: string
    bumpMap?: string
    displacementMap?: string
    emissiveMap?: string
    envMap?: string
    lightMap?: string
    map?: string
    metalnessMap?: string
    normalMap?: string
    roughnessMap?: string
    clearcoatMap?: string
    clearcoatNormalMap?: string
    clearcoatRoughnessMap?: string
    sheenRoughnessMap?: string
    sheenColorMap?: string
    specularIntensityMap?: string
    specularColorMap?: string
    thicknessMap?: string
    transmissionMap?: string
  }
  textureAttributes?: object
  materialAttributes?: object
  name: string
}
