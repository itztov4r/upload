const videos = [];
let totalSize = 0;

const uploadZone = document.getElementById('uploadZone');
const fileInput  = document.getElementById('fileInput');
const videoGrid  = document.getElementById('videoGrid');
const emptyState = document.getElementById('emptyState');
const gridTitle  = document.getElementById('gridTitle');
const progressContainer = document.getElementById('progressContainer');
const progressFill      = document.getElementById('progressFill');
const progressFilename  = document.getElementById('progressFilename');
const progressPct       = document.getElementById('progressPct');

/* ── Drag & Drop ── */
uploadZone.addEventListener('dragover', e => {
  e.preventDefault();
  uploadZone.classList.add('drag-over');
});
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('drag-over');
  handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', () => handleFiles(fileInput.files));

/* ── File handling ── */
function handleFiles(files) {
  const videoFiles = Array.from(files).filter(f => f.type.startsWith('video/'));
  if (!videoFiles.length) { showToast('Aucun fichier vidéo valide.', true); return; }
  videoFiles.forEach((f, i) => setTimeout(() => simulateUpload(f), i * 300));
}

function simulateUpload(file) {
  progressContainer.classList.add('show');
  progressFilename.textContent = file.name;
  let pct = 0;

  const interval = setInterval(() => {
    pct += Math.random() * 18 + 4;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      progressFill.style.width = '100%';
      progressPct.textContent  = '100%';
      setTimeout(() => {
        progressContainer.classList.remove('show');
        progressFill.style.width = '0%';
        addVideo(file);
      }, 400);
    }
    progressFill.style.width = pct + '%';
    progressPct.textContent  = Math.round(pct) + '%';
  }, 80);
}

function addVideo(file) {
  const url = URL.createObjectURL(file);
  const id  = Date.now() + Math.random();
  videos.push({ id, file, url });
  totalSize += file.size;
  updateStats(file.name);
  renderCards();
  showToast(`"${file.name.slice(0, 30)}" ajoutée !`);
}

/* ── Render cards ── */
function renderCards() {
  emptyState.style.display = 'none';
  gridTitle.style.display  = 'block';
  document.querySelectorAll('.video-card').forEach(c => c.remove());

  videos.forEach((v, i) => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.style.animationDelay = (i * 0.05) + 's';
    card.innerHTML = `
      <div class="video-thumb" onclick="openModal('${v.url}', '${escHtml(v.file.name)}')">
        <video src="${v.url}" muted preload="metadata" style="pointer-events:none"></video>
        <div class="play-overlay">
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
      <div class="video-info">
        <h3 title="${escHtml(v.file.name)}">${escHtml(v.file.name)}</h3>
        <div class="video-meta">
          <span class="video-size">${formatSize(v.file.size)}</span>
          <button class="delete-btn" onclick="deleteVideo('${v.id}', event)" title="Supprimer">
            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
        </div>
      </div>`;
    videoGrid.appendChild(card);
  });

  if (!videos.length) {
    emptyState.style.display = '';
    gridTitle.style.display  = 'none';
  }
}

/* ── Delete ── */
function deleteVideo(id, e) {
  e.stopPropagation();
  const idx = videos.findIndex(v => v.id == id);
  if (idx === -1) return;
  totalSize -= videos[idx].file.size;
  URL.revokeObjectURL(videos[idx].url);
  videos.splice(idx, 1);
  renderCards();
  updateStats();
  showToast('Vidéo supprimée.');
}

/* ── Modal player ── */
function openModal(url, name) {
  document.getElementById('modalVideo').src    = url;
  document.getElementById('modalTitle').textContent = name;
  document.getElementById('modalBg').classList.add('show');
}

function closeModal(e) {
  if (e.target === document.getElementById('modalBg')) closeModalBtn();
}

function closeModalBtn() {
  document.getElementById('modalBg').classList.remove('show');
  const v = document.getElementById('modalVideo');
  v.pause(); v.src = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalBtn(); });

/* ── Stats ── */
function updateStats(lastName) {
  document.getElementById('statCount').textContent = videos.length;
  document.getElementById('statSize').textContent  = formatSize(totalSize);
  if (lastName)
    document.getElementById('statLast').textContent =
      new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

/* ── Helpers ── */
function formatSize(bytes) {
  if (bytes < 1024)            return bytes + ' B';
  if (bytes < 1024 * 1024)     return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 ** 3)       return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  return (bytes / 1024 ** 3).toFixed(2) + ' GB';
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

let toastTimer;
function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.toggle('error', isError);
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}
