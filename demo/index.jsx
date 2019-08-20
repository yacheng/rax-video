import {createElement, Component, render} from 'rax';
import Video from '../src/index';
import * as DriverDOM from 'driver-dom';
import { isWeex } from 'universal-env';
import * as DriverWeex from 'driver-weex';

render(<Video style={{ width: 750, height: 400 }} autoPlay controls={false} src="https://cloud.video.taobao.com/play/u/2780279213/p/1/e/6/t/1/d/ld/36255062.mp4" />, document.body, { driver: isWeex ? DriverWeex : DriverDOM });
