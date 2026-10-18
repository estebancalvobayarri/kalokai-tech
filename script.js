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
      'Duración y precio: 4 horas · 125 €',
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

// Formaciones: solo una desplegada a la vez (respaldo para navegadores sin <details name>)
document.querySelectorAll('details[name="formaciones"]').forEach(function (d, _, todos) {
  d.addEventListener('toggle', function () {
    if (!d.open) return;
    todos.forEach(function (o) { if (o !== d) o.open = false; });
  });
});

// Kalokai Tech: formulario de contacto. El envío prepara un correo a hola@kalokai.es con los datos.
(function () {
  var form = document.getElementById('contacto-form');
  if (!form) return;
  var status = document.getElementById('contacto-status');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var faltan = [];
    ['c-nombre', 'c-email'].forEach(function (id) {
      var input = document.getElementById(id);
      var valido = input.value.trim() !== '' && input.checkValidity();
      input.parentElement.classList.toggle('invalid', !valido);
      input.setAttribute('aria-invalid', String(!valido));
      if (!valido) faltan.push(input);
    });
    var acepto = document.getElementById('c-acepto');
    if (faltan.length || !acepto.checked) {
      status.textContent = faltan.length
        ? 'Revisa los campos marcados para poder enviar la consulta.'
        : 'Marca la casilla de aceptación para poder enviar la consulta.';
      status.classList.add('error');
      (faltan[0] || acepto).focus();
      return;
    }
    var d = new FormData(form);
    var lineas = [
      'Formación: ' + d.get('formacion'),
      '',
      'Nombre: ' + d.get('nombre'),
      'Correo: ' + d.get('email'),
      'Teléfono: ' + (d.get('telefono') || '—'),
      '',
      d.get('mensaje') || ''
    ];
    window.location.href = 'mailto:hola@kalokai.es' +
      '?subject=' + encodeURIComponent('Kalokai Tech · Información · ' + d.get('formacion')) +
      '&body=' + encodeURIComponent(lineas.join('\n'));
    status.classList.remove('error');
    status.textContent = 'Hemos abierto tu correo con la consulta preparada. Solo falta enviarla. Si no se abre, escríbenos a hola@kalokai.es o por WhatsApp.';
  });
})();
