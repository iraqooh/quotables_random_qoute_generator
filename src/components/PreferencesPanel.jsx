import { useState, useEffect } from 'react';

const PreferencesPanel = () => {
  const [theme, setTheme] = useState('light');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Load preferences from localStorage on mount
    const savedTheme = localStorage.getItem('theme');
    const savedAutoRefresh = localStorage.getItem('autoRefresh') === 'true';
    const savedFilter = localStorage.getItem('filter');

    if (savedTheme) setTheme(savedTheme);
    if (savedAutoRefresh !== null) setAutoRefresh(savedAutoRefresh);
    if (savedFilter) setFilter(savedFilter);
  }, []);

  useEffect(() => {
    // Save preferences to localStorage when they change
    localStorage.setItem('theme', theme);
    localStorage.setItem('autoRefresh', autoRefresh);
    localStorage.setItem('filter', filter);
  }, [theme, autoRefresh, filter]);

  return (
    <div>
      <h2>Preferences</h2>
      <label>
        Theme:
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <br />
      <label>
        Auto-Refresh:
        <input
          type="checkbox"
          checked={autoRefresh}
          onChange={(e) => setAutoRefresh(e.target.checked)}
        />
      </label>
      <br />
      <label>
        Filter:
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </label>
    </div>
  );
};

export default PreferencesPanel;
