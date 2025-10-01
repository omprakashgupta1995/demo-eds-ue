import { div, form } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const cfg = {
    css: block.dataset.cssLink,
    js: block.dataset.jsLink,
    id: block.dataset.formId,
    key: block.dataset.formKey,
  };

  block.innerHTML = '';

  // Build form wrapper
  const formEl = form({
    method: 'post',
    action: '/forms/membership',
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
