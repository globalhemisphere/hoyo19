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
        <span class="eyebrow">Seis salidas al año · Plazas contadas</span>
        <h3>¿Cuántos años lleváis diciendo «el año que viene sí»?</h3>
        <p>Valderrama. Teeth of the Dog. El viaje que siempre se queda en la sobremesa. Este año pasa.</p>
      </div>
      <div class="panel-form">
        <span class="eyebrow">La lista de Hoyo 19</span>
        <h4>Los de la lista eligen plaza primero</h4>
        <p>Cada salida nueva se anuncia aquí antes que en ningún sitio. Cuando llega a la web, media lista ya ha reservado. Tú decides en qué lado estar.</p>
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
          <button type="submit" class="btn btn-solid">Quiero enterarme el primero</button>
          <p class="mini">Un email solo cuando haya viaje nuevo. Sin spam. Te borras con un clic.</p>
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
// Los leads se envían con FormSubmit y te llegan al correo. No hace falta key.
// La PRIMERA vez que alguien envíe el formulario, FormSubmit te manda un email
// de confirmación a esta dirección: ábrelo y pulsa "Activate Form" una sola vez.
// A partir de ahí, todos los leads te llegan directos.
const FORMSUBMIT_EMAIL = 'info@globalhemisphere.com';

document.addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type=submit], .btn-solid');
  const original = btn ? btn.textContent : '';
  const inModal = form.closest('.modal-overlay');
  if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }

  try {
    const data = Object.fromEntries(new FormData(form).entries());
    data._subject = 'Nuevo lead Hoyo 19 · ' + (data.origen || 'Web');
    data._template = 'table';
    data._captcha = 'false';
    const res = await fetch('https://formsubmit.co/ajax/' + encodeURIComponent(FORMSUBMIT_EMAIL), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('network');
    if (btn) btn.textContent = 'Recibido. Te escribimos pronto.';
    form.reset();
    if (inModal) setTimeout(function () { inModal.classList.remove('open'); }, 1500);
  } catch (err) {
    if (btn) btn.textContent = 'Ups, inténtalo otra vez';
  } finally {
    if (btn) setTimeout(function () { btn.textContent = original; btn.disabled = false; }, 4000);
  }
});
