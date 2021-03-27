import { Spinner } from 'spin.js';

const opts = {
    lines: 30,
    length: 200,
    width: 10,
    radius: 50,
    scale: 0.55,
    corners: 1,
    speed: 1.1,
    rotate: 49,
    animation: 'spinner-line-shrink',
    direction: 1,
    color: '#ff6b08',
    fadeColor: 'transparent',
    top: '49%',
    left: '49%',
    shadow: '0 0 1px transparent',
    zIndex: 2000,
    className: 'spinner',
    position: 'relative',
};
const loader = document.querySelector('#loading');
export const spinner = new Spinner(opts);
