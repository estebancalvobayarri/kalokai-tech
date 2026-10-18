// Kalokai Tech: formulario emergente para reservar plaza.
// Los botones con data-reserva lo abren. El envío prepara un correo a DESTINO con los datos.
(function () {
  var DESTINO = 'hola@kalokai.es';
  var dialog = document.getElementById('reserva');
  if (!dialog) return;
  var form = document.getElementById('reserva-form');
  var status = document.getElementById('reserva-status');

  function abrir() {
    status.textContent = '';
    status.classList.remove('error');
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    document.getElementById('r-nombre').focus();
  }
  function cerrar() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  document.querySelectorAll('[data-reserva]').forEach(function (el) {
    el.addEventListener('click', function (event) { event.preventDefault(); abrir(); });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', cerrar);
  dialog.addEventListener('click', function (event) { if (event.target === dialog) cerrar(); });
  if (location.hash === '#reserva') abrir();

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var faltan = [];
    ['r-nombre', 'r-email'].forEach(function (id) {
      var input = document.getElementById(id);
      var valido = input.value.trim() !== '' && input.checkValidity();
      input.parentElement.classList.toggle('invalid', !valido);
      input.setAttribute('aria-invalid', String(!valido));
      if (!valido) faltan.push(input);
    });
    var acepto = document.getElementById('r-acepto');
    if (faltan.length || !acepto.checked) {
      status.textContent = faltan.length
        ? 'Revisa los campos marcados para poder enviar la reserva.'
        : 'Marca la casilla de aceptación para poder enviar la reserva.';
      status.classList.add('error');
      (faltan[0] || acepto).focus();
      return;
    }
    var d = new FormData(form);
    var lineas = [
      'Formación: Tu web profesional en 4 horas, con Claude y GitHub',
      'Fecha: sábado 7 de noviembre de 2026',
      '',
      'Nombre: ' + d.get('nombre'),
      'Correo: ' + d.get('email'),
      'Teléfono: ' + (d.get('telefono') || '—'),
      '',
      d.get('mensaje') || ''
    ];
    window.location.href = 'mailto:' + DESTINO +
      '?subject=' + encodeURIComponent('Kalokai Tech · Reserva de plaza · Tu web en 4 horas · 7 de noviembre') +
      '&body=' + encodeURIComponent(lineas.join('\n'));
    status.classList.remove('error');
    status.textContent = 'Hemos abierto tu correo con la reserva preparada. Solo falta enviarla. Si no se abre, escríbenos a hola@kalokai.es o por WhatsApp.';
  });
})();
