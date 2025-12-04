/**
 * index.js - flujo principal para "El panita viajero"
 * - Carga: Country (Colombia), Region (lista)
 * - Al seleccionar región: carga Region/{id}/departments
 * - Al seleccionar departamento: carga Department/{id}
 * - Modo oscuro persistente en localStorage
 *
 * Endpoints usados:
 * - https://api-colombia.com/api/v1/Country/Colombia
 * - https://api-colombia.com/api/v1/Region
 * - https://api-colombia.com/api/v1/Region/{id}/departments
 * - https://api-colombia.com/api/v1/Department/{id}
 */

const API_BASE = 'https://api-colombia.com/api/v1';

// --- Selectores DOM ---
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const countryCard = document.getElementById('countryCard');
const regionsList = document.getElementById('regionsList');
const regionSearch = document.getElementById('regionSearch');
const regionCard = document.getElementById('regionCard');
const departmentsList = document.getElementById('departmentsList');
const departmentsCard = document.getElementById('departmentsCard');
const departmentDetail = document.getElementById('departmentDetail');

// Estado
let regions = [];
let currentRegion = null;
let currentDepartments = [];
let currentDepartment = null;

// -------------------------
// Tema oscuro / claro
// -------------------------
function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') document.body.classList.add('dark');
  themeToggle.checked = saved === 'dark';
  themeLabel.textContent = saved === 'dark' ? 'Modo oscuro' : 'Modo claro';
}
themeToggle.addEventListener('change', () => {
  const isDark = themeToggle.checked;
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeLabel.textContent = isDark ? 'Modo oscuro' : 'Modo claro';
});
initTheme();

// -------------------------
// Helpers UI
// -------------------------
function setLoading(el, text = 'Cargando...') {
  el.classList.add('loading');
  el.innerHTML = `<div class="card-body"><p class="small muted">${text}</p></div>`;
}
function setError(el, text = 'Error al cargar') {
  el.classList.add('loading');
  el.innerHTML = `<div class="card-body"><p class="small muted">⚠️ ${text}</p></div>`;
}
function clearCard(el) {
  el.classList.remove('loading');
  el.innerHTML = '';
}

// -------------------------
// Fetch iniciales
// -------------------------
async function fetchCountry() {
  setLoading(countryCard, 'Cargando datos de Colombia...');
  try {
    const res = await fetch(`${API_BASE}/Country/Colombia`);
    if (!res.ok) throw new Error('Respuesta no OK: ' + res.status);
    const country = await res.json();
    renderCountry(country);
  } catch (err) {
    console.error(err);
    setError(countryCard, 'No se pudo cargar la información del país.');
  }
}

async function fetchRegions() {
  setLoading({ classList: { add() {} }, innerHTML: '' }, ''); // no-op, regiones se listan en la derecha
  try {
    const res = await fetch(`${API_BASE}/Region`);
    if (!res.ok) throw new Error('Regions not OK');
    const data = await res.json();
    regions = Array.isArray(data) ? data : [];
    renderRegions(regions);
  } catch (err) {
    console.error(err);
    setError(regionsList, 'No se pudieron cargar las regiones.');
  }
}

// -------------------------
// Render Country
// -------------------------
function renderCountry(country) {
  clearCard(countryCard);
  const flags = country.flags && country.flags.length ? country.flags[0] : '';
  countryCard.innerHTML = `
    <div class="card-body">
      <div class="country-grid">
        <img src="${flags}" alt="Bandera de ${country.name}" class="country-flag" onerror="this.style.display='none'">
        <div class="country-info">
          <h2>${country.name}</h2>
          <p class="small">${country.description ? country.description.slice(0,1600) + '...' : ''}</p>
          <div class="country-meta small">
            <div><strong>Capital:</strong> ${country.stateCapital || 'Bogotá'}</div>
            <div><strong>Población:</strong> ${country.population?.toLocaleString() || 'N/A'}</div>
            <div><strong>Región geográfica:</strong> ${country.region || 'Americas'}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// -------------------------
// Render Regions list
// -------------------------
function renderRegions(list) {
  regionsList.innerHTML = '';
  if (!list.length) {
    regionsList.innerHTML = '<li class="small muted">No hay regiones</li>';
    return;
  }

  list.forEach(region => {
    const li = document.createElement('li');
    li.tabIndex = 0;
    li.textContent = region.name;
    li.title = region.description || '';
    li.addEventListener('click', () => selectRegion(region));
    li.addEventListener('keypress', (e) => { if (e.key === 'Enter') selectRegion(region); });
    regionsList.appendChild(li);
  });
}

// -------------------------
// Select a region -> load departments
// -------------------------
async function selectRegion(region) {
  document.querySelector(".bottom-row").style.display = "none";
  currentRegion = region;
  // marcar activo
  Array.from(regionsList.children).forEach(li => li.classList.toggle('active', li.textContent === region.name));
  // Mostrar region info
  renderRegionInfo(region);
  // Cargar departamentos de la region
  setLoading(departmentsCard, 'Cargando departamentos...');
  departmentsList.innerHTML = '';
  try {
    const res = await fetch(`${API_BASE}/Region/${region.id}/departments`);
    if (!res.ok) throw new Error('Error cargando departamentos');
    const deps = await res.json();
    currentDepartments = Array.isArray(deps) ? deps : [];
    renderDepartmentsList(currentDepartments);
    clearCard(departmentsCard);
    departmentsCard.appendChild(departmentsList.parentElement || departmentsList);
  } catch (err) {
    console.error(err);
    setError(departmentsCard, 'No se pudieron cargar los departamentos de la región.');
  }
}

function renderRegionInfo(region) {
  clearCard(regionCard);
  regionCard.innerHTML = `
    <div class="card-body">
      <h3>${region.name}</h3>
      <p class="small">${region.description || 'Sin descripción disponible.'}</p>
    </div>
  `;
}

// Render departments list (right side)
function renderDepartmentsList(deps) {
  departmentsList.innerHTML = '';
  if (!deps.length) {
    departmentsList.innerHTML = '<li class="small muted">No hay departamentos</li>';
    return;
  }
  deps.forEach(d => {
    const li = document.createElement('li');
    li.tabIndex = 0;
    li.innerHTML = `<strong>${d.name}</strong> <div class="small muted">municipios: ${d.municipalities ?? 'N/A'}</div>`;
    li.addEventListener('click', () => selectDepartment(d));
    li.addEventListener('keypress', (e) => { if (e.key === 'Enter') selectDepartment(d); });
    departmentsList.appendChild(li);
  });
}

// -------------------------
// Select and show department details
// -------------------------
async function selectDepartment(dep) {
  currentDepartment = dep;
  document.querySelector(".bottom-row").style.display = "flex";
  // marcar seleccionado
  Array.from(departmentsList.children).forEach(li => li.classList.toggle('active', li.querySelector('strong')?.textContent === dep.name));
  // fetch detalle completo por id (si hay endpoint)
  setLoading(departmentDetail, 'Cargando detalle del departamento...');
  try {
    let detailed = dep;
    // Intentar obtener detalle por ID si existe endpoint
    const res = await fetch(`${API_BASE}/Department/${dep.id}`);
    if (res.ok) {
      detailed = await res.json();
    }
    renderDepartmentDetail(detailed);
  } catch (err) {
    console.warn('No se pudo obtener detalle extra, usando objeto disponible.', err);
    renderDepartmentDetail(dep);
  }
}

function renderDepartmentDetail(d) {
  clearCard(departmentDetail);
  const img = `img/${d.name.toLowerCase()}.png`;
  const capitalName = (d.cityCapital && d.cityCapital.name) || d.cityCapital || 'No disponible';
  departmentDetail.innerHTML = `
    <div class="card-body">
      <div class="department-header">
        <img src="${img}" alt="${d.name}" class="department-image" onerror="this.style.display='none'">
        <div>
          <h3>${d.name}</h3>
          <p class="small">${(d.description && d.description.slice(0,400)) || 'Descripción no disponible.'}</p>
          <div class="detail-grid small">
            <div><strong>Capital:</strong> ${capitalName}</div>
            <div><strong>Municipios:</strong> ${d.municipalities ?? 'N/A'}</div>
            <div><strong>Superficie:</strong> ${d.surface ? d.surface.toLocaleString() + ' km²' : 'N/A'}</div>
            <div><strong>Población:</strong> ${d.population ? d.population.toLocaleString() : 'N/A'}</div>
            <div><strong>Prefijo telefónico:</strong> ${d.phonePrefix ?? 'N/A'}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// -------------------------
// Buscador de regiones (filtro)
 // -------------------------
const regionSearchInput = document.getElementById('regionSearch');
regionSearchInput.addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  const filtered = regions.filter(r => r.name.toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q));
  // re-render lista
  regionsList.innerHTML = '';
  filtered.forEach(region => {
    const li = document.createElement('li');
    li.tabIndex = 0;
    li.textContent = region.name;
    li.title = region.description || '';
    li.addEventListener('click', () => selectRegion(region));
    regionsList.appendChild(li);
  });
});

// -------------------------
// Inicialización
// -------------------------
async function init() {
  setLoading(countryCard, 'Cargando Colombia...');
  setLoading(regionCard, 'Cargando...');
  setLoading(departmentsCard, 'Esperando región...');
  setLoading(departmentDetail, 'Selecciona un departamento');

  await Promise.all([fetchCountry(), fetchRegions()]);
  // limpiar regionCard default
  clearCard(regionCard);
  regionCard.innerHTML = `<div class="card-body"><p class="small muted">Selecciona una región para ver su información.</p></div>`;
  departmentsCard.querySelector('.card-header .small')?.remove?.();
}
init();
