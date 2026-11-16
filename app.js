const form = document.querySelector('#qr-form');
const input = document.querySelector('#url');
const error = document.querySelector('#url-error');
const canvas = document.querySelector('#qr-canvas');
const emptyState = document.querySelector('#empty-state');
const status = document.querySelector('#qr-status');
const download = document.querySelector('#download');

function clearResult() {
  canvas.hidden = true;
  emptyState.hidden = false;
  download.disabled = true;
  status.textContent = '';
}

input.addEventListener('input', () => {
  error.textContent = '';
  input.removeAttribute('aria-invalid');
  clearResult();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearResult();
  error.textContent = '';
  input.removeAttribute('aria-invalid');

  let url;
  try {
    const value = input.value.trim();
    if (!value) throw new Error('empty');
    url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`);
    if (!['http:', 'https:'].includes(url.protocol) || !url.hostname || url.username || url.password) throw new Error('invalid');
  } catch {
    error.textContent = 'Introduce una dirección web válida, por ejemplo https://ejemplo.com.';
    input.setAttribute('aria-invalid', 'true');
    input.focus();
    return;
  }

  try {
    const qr = qrcode(0, 'M');
    qr.addData(url.href);
    qr.make();
    const modules = qr.getModuleCount();
    const quietZone = 4;
    const scale = Math.max(4, Math.floor(1024 / (modules + quietZone * 2)));
    canvas.width = canvas.height = (modules + quietZone * 2) * scale;
    const context = canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#000';
    for (let row = 0; row < modules; row++) {
      for (let col = 0; col < modules; col++) {
        if (qr.isDark(row, col)) context.fillRect((col + quietZone) * scale, (row + quietZone) * scale, scale, scale);
      }
    }
    emptyState.hidden = true;
    canvas.hidden = false;
    download.disabled = false;
    status.textContent = 'QR listo para compartir.';
  } catch {
    error.textContent = 'No se pudo crear el QR. Prueba con un enlace más corto.';
    input.setAttribute('aria-invalid', 'true');
  }
});

download.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'codigo-qr.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
