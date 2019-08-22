import { createElement, useRef } from 'rax';
import { isWeex } from 'universal-env';

const PLAY = 'play';
const PAUSE = 'pause';

export default function Video(props) {
  const refEl = useRef(null);

  if (isWeex) {
    props.playStatus = props.playControl;

    if (props.controls == null || props.controls === true) {
      props.controls = true;
    } else {
      props.controls = 'nocontrols';
    }

    return (<video {...props} />);
  } else {
    const nativeProps = { ...props };

    delete nativeProps.autoPlay;
    delete nativeProps.src;

    if (props.autoPlay || props.playControl === PLAY) {
      nativeProps.autoPlay = props.autoPlay;
    }
    // Default controls is true
    if (props.controls == null || props.controls === true) {
      nativeProps.controls = true;
    } else {
      delete nativeProps.controls;
    }

    const node = refEl.current;
    if (node) {
      if (props.playControl === PAUSE) {
        node.pause();
      } else if (props.playControl === PLAY) {
        node.play();
      }
    }

    return <video ref={refEl} {...nativeProps} webkit-playsinline playsinline><source src={props.src} /></video>;
  }
}
