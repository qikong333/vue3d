import { Props } from '../type/props';

export default function (props: Props): { width: number; height: number } {
  if (props.id) {
    const el = document.getElementById(props.id) as HTMLElement;
    const parent = el?.parentNode as HTMLElement;
    return {
      width: parent?.clientWidth,
      height: parent?.clientHeight,
    };
  } else {
    return {
      width: props.width as number,
      height: props.height as number,
      // width: window.innerWidth,
      // height: window.innerHeight,
    };
  }
}
