(function() {
  if (document.cookie.split('; ').some(row => row.startsWith('tou-pp_agreed='))) return;

  // Get the script tag that loaded this file
  const currentScript = document.currentScript || (function() {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  const linkHTML = currentScript?.getAttribute('data-link') || '';

  const popup = document.createElement('div');
  popup.id = 'consent-popup';
  popup.innerHTML = `
    <p>By clicking "Agree", you have read and agree to the ${linkHTML} and agree to the collection and use of your information by cookies and similar technologies, as set forth in our <a href="https://www.wbdprivacy.com/policycenter/b2c/">Privacy Policy</a>.</p>
    <button id="agree-btn">Agree</button>
  `;
  Object.assign(popup.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    border: '2px solid #444',
    padding: '20px',
    boxShadow: '0 0 15px rgba(0,0,0,0.3)',
    zIndex: 1000
  });

  document.body.appendChild(popup);

  document.getElementById('agree-btn').onclick = function() {
    const d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    document.cookie = "tou-pp_agreed=true; expires=" + d.toUTCString() + "; path=/";
    popup.remove();
  };
})();
