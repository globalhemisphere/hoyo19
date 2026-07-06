// ---------- Menú móvil ----------
document.addEventListener('click', function (e) {
  const burger = e.target.closest('.burger');
  if (burger) {
    document.querySelector('.menu').classList.toggle('open');
  } else if (!e.target.closest('.menu')) {
    const m = document.querySelector('.menu.open');
    if (m) m.classList.remove('open');
  }
});

// ---------- Pop-up de entrada (formulario al abrir la web) ----------
(function () {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="Pide información">
      <button class="close" aria-label="Cerrar">&times;</button>
      <div class="side">
        <span class="eyebrow">Seis escapadas al año · Plazas contadas</span>
        <h3>¿Te vienes de escapada?</h3>
        <p>El viaje del que hablarás toda tu vida. Tú solo llevas los palos.</p>
      </div>
      <div class="panel-form">
        <span class="eyebrow">Sin compromiso</span>
        <h4>Cuéntanos y te asesoramos</h4>
        <p>Déjanos tus datos y te avisamos de cada salida antes que nadie. Si ya tienes grupo, te montamos el viaje.</p>
        <form>
          <input type="hidden" name="origen" value="Pop-up de entrada">
          <input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off">
          <input type="text" name="nombre" placeholder="Tu nombre" aria-label="Nombre">
          <input type="email" name="email" placeholder="Tu email" required aria-label="Email">
          <select name="interes" aria-label="Qué te interesa">
            <option>¿Qué te interesa?</option>
            <option>Una de las seis escapadas</option>
            <option>Un viaje a medida para mi grupo</option>
            <option>Solo avisadme de nuevas salidas</option>
          </select>
          <button type="submit" class="btn btn-solid">Quiero saber más</button>
          <p class="mini">Te respondemos en menos de 24 h. Sin spam.</p>
        </form>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const modal = overlay.querySelector('.modal');
  function close() { overlay.classList.remove('open'); }
  overlay.addEventListener('click', function (e) {
    if (!modal.contains(e.target) || e.target.closest('.close')) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  // Mostrar una vez por sesión, 1,2 s después de cargar
  if (!sessionStorage.getItem('h19_popup')) {
    setTimeout(function () {
      overlay.classList.add('open');
      sessionStorage.setItem('h19_popup', '1');
    }, 1200);
  }
})();

// ---------- Formularios ----------
// Los leads se envían con Web3Forms y te llegan al correo.
// Para activarlo: saca una access key gratis en https://web3forms.com
// (pones tu email, te llega la key) y pégala aquí abajo entre las comillas.
// Mientras no la pegues, el formulario funciona en modo demo (no envía).
const WEB3FORMS_KEY = 'PEGA-AQUI-TU-ACCESS-KEY';

document.addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type=submit], .btn-solid');
  const original = btn ? btn.textContent : '';
  const inModal = form.closest('.modal-overlay');
  if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }

  const keyReady = WEB3FORMS_KEY && WEB3FORMS_KEY.indexOf('PEGA') !== 0;

  try {
    if (keyReady) {
      const data = Object.fromEntries(new FormData(form).entries());
      data.access_key = WEB3FORMS_KEY;
      data.subject = 'Nuevo lead Hoyo 19 · ' + (data.origen || 'Web');
      data.from_name = 'Web Hoyo 19';
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('network');
    }
    if (btn) btn.textContent = 'Recibido. Te escribimos pronto.';
    form.reset();
    if (inModal) setTimeout(function () { inModal.classList.remove('open'); }, 1500);
  } catch (err) {
    if (btn) btn.textContent = 'Ups, inténtalo otra vez';
  } finally {
    if (btn) setTimeout(function () { btn.textContent = original; btn.disabled = false; }, 4000);
  }
});
