document.addEventListener('DOMContentLoaded', async () => {
  // ----------------------
  // IndexedDB Setup First
  // ----------------------
  const DBModule = (() => {
    const DB_NAME = 'QuotablesDB', DB_VERSION = 1;
    let db;
    function initDB() {
      return new Promise((res, rej) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = e => {
          db = e.target.result;
          if (!db.objectStoreNames.contains('favorites'))
            db.createObjectStore('favorites', { keyPath: 'id' });
          if (!db.objectStoreNames.contains('preferences'))
            db.createObjectStore('preferences', { keyPath: 'key' });
        };
        req.onsuccess = e => { db = e.target.result; res(); };
        req.onerror = e => rej(e.target.error);
      });
    }
    function addFavorite(q) {
      return new Promise((res, rej) => {
        const tx = db.transaction('favorites', 'readwrite');
        tx.objectStore('favorites').put(q);
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
      })
    }

    function updateFavoritesCount() {
        const tx = DBModule.db.transaction('favorites', 'readonly');
        const store = tx.objectStore('favorites');
        const request = store.count();
        request.onsuccess = () => {
            const countEl = document.getElementById('favorites-count');
            if (countEl) countEl.textContent = request.result;
        };
    }

    function getPreference(key) {
      return new Promise(res => {
        const tx = db.transaction('preferences', 'readonly');
        const req = tx.objectStore('preferences').get(key);
        req.onsuccess = () => res(req.result?.value);
      });
    }
    function savePreference(key, value) {
      const tx = db.transaction('preferences', 'readwrite');
      tx.objectStore('preferences').put({ key, value });
    }
    return { initDB, addFavorite, getPreference, savePreference, get db() { return db; } };
  })();

  await DBModule.initDB();

  // ----------------------
  // UI Element Selectors
  // ----------------------
  const appRoot = document.getElementById('app-root');
  const modeRadios = document.querySelectorAll('input[name="mode"]');

  const favoritesModal = document.getElementById('favorites-modal');
  const favoritesContent = favoritesModal?.querySelector('.favModal');
  const favOpen = document.getElementById('favorites-btn');
  const favClose = document.getElementById('close-favorites');

  const preferencesModal = document.getElementById('preferences-modal');
  const preferencesContent = preferencesModal?.querySelector('.prefModal');
  const prefOpen = document.getElementById('preferences-btn');

  const quoteTextEl = document.getElementById('quote-text');
  const quoteAuthorEl = document.getElementById('quote-author');
  const newQuoteBtn = document.getElementById('new-quote');
  const copyBtn = document.getElementById('copy-quote');
  const shareBtn = document.getElementById('share-quote');
  const favoriteBtn = document.getElementById('favorite-quote');

  const autoToggle = document.getElementById('auto-refresh-toggle');
  const autoIntervalSel = document.getElementById('refresh-interval');

  const saveStatus = document.getElementById('save-preferences');
  const languageSelect = document.getElementById('language-select');
  const fontSelect = document.getElementById('font-select');

  const simulateLoading = () => {
    const saving = document.getElementById('saving');
    if (saveStatus.classList.contains('bg-white')) {
        saving.classList.add('fa-spinner');
    } else {
        saveStatus.classList.add('bg-white');
        saveStatus.classList.add('text-black');
        saveStatus.classList.remove('bg-lime-500');
        saving.classList.remove('fa-check');
        saving.classList.add('fa-spinner');
        saving.classList.remove('text-black');
        saving.classList.remove('text-white');
    }
    setTimeout(() => {
        saveStatus.classList.remove('bg-white');
        saveStatus.classList.add('bg-lime-500');
        saving.classList.remove('fa-spinner');
        saving.classList.add('fa-check');
        saving.classList.remove('text-black');
        saving.classList.add('text-white');
    }, 1500);
  }
  

  // ----------------------
  // Quote API
  // ----------------------
  const API_URL = 'https://favqs.com/api';
  const QuoteAPI = (() => {
    async function fetchQuote() {
      const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(`${API_URL}/qotd`);
      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error('Fetch error');
      const data = await res.json();
      const parsed = JSON.parse(data.contents);
      return parsed.quote;
    }
    return { fetchQuote };
  })();

  // ----------------------
  // Quote Handling
  // ----------------------
  let currentQuote;
  async function displayQuote() {
    try {
      const q = await QuoteAPI.fetchQuote();
      currentQuote = q;
      quoteTextEl.textContent = `"${q.body}"`;
      quoteAuthorEl.textContent = `— ${q.author}`;
    } catch {
      quoteTextEl.textContent = 'Oops, failed to load.';
      quoteAuthorEl.textContent = '';
    }
  }

  // ----------------------
  // Modal Logic
  // ----------------------
  favOpen?.addEventListener('click', () => {
    loadFavorites();
    favoritesModal?.classList.remove('hidden');
  });

  favClose?.addEventListener('click', () => favoritesModal?.classList.add('hidden'));

  favoritesModal?.addEventListener('click', e => {
    if (!favoritesContent.contains(e.target)) favoritesModal.classList.add('hidden');
  });

  prefOpen?.addEventListener('click', () => preferencesModal?.classList.remove('hidden'));

  preferencesModal?.addEventListener('click', e => {
    if (!preferencesContent.contains(e.target)) preferencesModal.classList.add('hidden');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      favoritesModal?.classList.add('hidden');
      preferencesModal?.classList.add('hidden');
    }
  });

  // ----------------------
  // Auto Refresh
  // ----------------------
  let refreshInterval;
  autoToggle?.addEventListener('click', () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
      autoToggle.innerText = 'Start';
    } else {
      const secs = Number(autoIntervalSel.value);
      autoToggle.innerText = 'Stop';
      refreshInterval = setInterval(displayQuote, secs * 1000);
    }
  });

  // ----------------------
  // Quote Interactions
  // ----------------------
  newQuoteBtn?.addEventListener('click', async () => {
    const res = await fetch('https://quotesondesign.com/wp-json/wp/v2/posts/');
    const data = await res.json();
    const { content, title } = data[(Math.floor(Math.random() * (9 - 0 + 1)) + 0)]
    currentQuote.body = content.rendered.replace(/<[^>]*>/g, '');
    currentQuote.author = title.rendered;
    quoteTextEl.textContent = `"${currentQuote.body}"`;
    quoteAuthorEl.textContent = `— ${currentQuote.author}`;
  });

  copyBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(`${currentQuote.body} — ${currentQuote.author}`);
  });

  shareBtn?.addEventListener('click', () => {
    const tweet = encodeURIComponent(`${currentQuote.body} — ${currentQuote.author}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, '_blank');
  });

  favoriteBtn?.addEventListener('click', () => {
    DBModule.addFavorite(currentQuote).then(() => {
        alert('Quote saved to favorites!');
        updateFavoritesCount();
    });
  });

  // ----------------------
  // Favorites List Handling
  // ----------------------
  function loadFavorites() {
    const tx = DBModule.db.transaction('favorites', 'readonly');
    const store = tx.objectStore('favorites');
    const request = store.getAll();
    request.onsuccess = () => {
      const listContainer = document.getElementById('favorites-list');
      listContainer.innerHTML = '';
      const favorites = request.result;
      const countEl = document.getElementById('favorites-modal-count');
      if (countEl) countEl.textContent = favorites.length;
      if (favorites.length === 0) {
        listContainer.innerHTML = '<p class="text-center text-sm text-muted">No favorites yet.</p>';
        return;
      }
      favorites.forEach(q => {
        const div = document.createElement('div');
        div.className = 'p-2 border-b border-muted';
        div.innerHTML = `
          <p class="text-sm">"${q.body}"</p>
          <p class="text-xs text-muted">— ${q.author}</p>
        `;
        listContainer.appendChild(div);
      });
    };
  }

  function updateFavoritesCount() {
    const tx = DBModule.db.transaction('favorites', 'readonly');
    const store = tx.objectStore('favorites');
    const request = store.count();
    request.onsuccess = () => {
        const countEl = document.getElementById('favorites-count');
        if (countEl) countEl.textContent = request.result;
    };
  }

  document.getElementById('export-json')?.addEventListener('click', () => {
    console.log('Clicked');
    
    const tx = DBModule.db.transaction('favorites', 'readonly');
    const store = tx.objectStore('favorites');
    const request = store.getAll();
    request.onsuccess = () => {
      const data = JSON.stringify(request.result, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'favorites.json';
      a.click();
    };
  });

  document.getElementById('import-json')?.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const quotes = JSON.parse(evt.target.result);
        const tx = DBModule.db.transaction('favorites', 'readwrite');
        const store = tx.objectStore('favorites');
        quotes.forEach(q => store.put(q));
        tx.oncomplete = () => {
          alert('Favorites imported!');
          loadFavorites();
        };
      } catch {
        alert('Failed to import: Invalid JSON.');
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('clear-favorites')?.addEventListener('click', () => {
    if (!confirm('Are you sure you want to delete all favorite quotes?')) return;

    const tx = DBModule.db.transaction('favorites', 'readwrite');
    const store = tx.objectStore('favorites');
    const clearRequest = store.clear();
    clearRequest.onsuccess = () => {
        alert('All favorites cleared!');
        loadFavorites();
        updateFavoritesCount();
    };
  });

  // ----------------------
  // Preferences Handling
  // ----------------------
  const applyTheme = (mode) => {
    if (mode === 'dark') {
        appRoot.classList.add('dark');
    } else appRoot.classList.remove('dark');

    // update radio buttons
    modeRadios.forEach(radio => {
        radio.checked = radio.value === mode;
    })
  };

  async function loadPreferences() {
    const mode = await DBModule.getPreference('mode');
    const lang = await DBModule.getPreference('language');
    const font = await DBModule.getPreference('font');

    document.querySelector(`input[name="mode"][value="${mode}"]`).checked = true;

    if (lang) languageSelect.value = lang;
    if (font) fontSelect.value = font;
    applyTheme(mode);
  }

  modeRadios.forEach((radio) => {
    radio.addEventListener('change', async () => {
        const selectedMode = radio.value;
        applyTheme(selectedMode);
        DBModule.savePreference('mode', selectedMode);
        simulateLoading();
    });
  });

  languageSelect?.addEventListener('change', e => {
    DBModule.savePreference('language', e.target.value);
    simulateLoading();
  });

  fontSelect?.addEventListener('change', (event) => {
    DBModule.savePreference('font', event.target.value);
    simulateLoading();
  })

  await loadPreferences();
  await displayQuote();
  updateFavoritesCount();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}