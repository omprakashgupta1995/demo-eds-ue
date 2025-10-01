import { div, form } from '../../scripts/dom-helpers.js';
import dataMapMoObj from '../mbt-membership-block/datamap.js';

export default function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = [
    'login-item',
    'login-sub-item',
    'login-inner-item',
  ];
  dataMapMoObj.addIndexed(block);

  const cssLink = block.querySelector('.login-item1 .login-inner-item1 a').getAttribute('href');
  const jsLink = block.querySelector('.login-item2 .login-inner-item1 a').getAttribute('href');
  const formId = block.querySelector('.login-item3 .login-inner-item1').innerText;
  const formKey = block.querySelector('.login-item4 .login-inner-item1').innerText;
  const formAction = block.querySelector('.login-item5 .login-inner-item1 a').getAttribute('href');

  const cfg = {
    css: cssLink,
    js: jsLink,
    id: formId,
    key: formKey,
    action: formAction,
  };

  //   block.innerHTML = '';

  // Build form wrapper
  const formEl = form({
    method: 'post',
    action: cfg.action,
    id: 'WebForm',
    novalidate: true,
  });

  const wrapper = div(
    { class: 'formatic' },
    div({ id: 'formcorp-form' }),
  );
  formEl.appendChild(wrapper);
  block.appendChild(formEl);

  // Inject CSS into head
  if (cfg.css) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cfg.css;
    document.head.appendChild(link);
  }

  // Function to load external script and resolve when ready
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  // Load JS and then init Formatic
  if (cfg.js) {
    loadScript(cfg.js).then(() => {
      if (window.Formatic) {
        try {
          window.Formatic.createForm(
            'formcorp-form',
            cfg.id, // Enter Form ID
            cfg.key, // Enter Form Key
            'Live',
            'tmb',
            'default',
          );
        } catch (err) {
        //   console.error('Formatic init failed:', err);
        }
      } else {
        // console.error('Formatic library not available after loading script.');
      }
    }).catch((err) => {
    //   console.error('Failed to load Formatic script:', err);
      console.log(err);
    });
  }
}
