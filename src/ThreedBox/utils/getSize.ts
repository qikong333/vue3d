import { Props } from '../type/props'

export default function (props: Props): { width: number; height: number; rect?: any } {
  if (props.id) {
    const el = document.getElementById(props.id) as HTMLElement

    const parent = el?.parentNode as HTMLElement

    const rect = el.getBoundingClientRect()
    return {
      width: parent?.clientWidth,
      height: parent?.clientHeight,
      rect
    }
  } else {
    return {
      width: props.width as number,
      height: props.height as number
      // width: window.innerWidth,
      // height: window.innerHeight,
    }
  }
}
