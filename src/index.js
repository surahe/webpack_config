import _ from 'lodash';
import './style.scss'

function component() {
  let element = document.createElement('div');
  let button = document.createElement('button');
  let br = document.createElement('br');

  button.innerHTML = 'Click me and look at the console!';
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);

  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  // button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
  //   var print = module.default;

  //   print();
  // });

  return element;
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}

document.body.appendChild(component());