import { createElement, useRef, useEffect } from 'rax';
import { isWeex } from 'universal-env';
import cx from 'classnames/dedupe';
import './index.css'

const PLAY = 'play';
const PAUSE = 'pause';

export default function Video(props) {
  const refEl = useRef(null);
  const { className } = props;
  delete props.className;
  if (isWeex) {
    props.playStatus = props.playControl;

    if (props.controls == undefined || props.controls === true) {
      props.controls = true;
    } else {
      props.controls = 'nocontrols';
    }

    return (<video className={cx('rax-video', className)}  {...props} />);
  } else {
    const nativeProps = { ...props };

    delete nativeProps.autoPlay;
    delete nativeProps.src;

    if (props.autoPlay || props.playControl === PLAY) {
      nativeProps.autoPlay = props.autoPlay;
    }
    // Default controls is true
    if (props.controls === undefined || props.controls === true) {
      nativeProps.controls = true;
    } else {
      delete nativeProps.controls;
    }

    useEffect(() => {
      const node = refEl.current;
      if (!props.autoPlay || props.playControl === PAUSE) {
        node.pause();
      } else if (props.autoPlay || props.playControl === PLAY) {
        node.play();
      }
    }, []);
    return <video className={cx('rax-video', className)} ref={refEl} {...nativeProps} webkit-playsinline playsinline muted><source src={props.src} /></video>;
  }
}
