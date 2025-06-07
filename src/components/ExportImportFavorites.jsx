import React from 'react';
import supabase from '../supabase/client';

const ExportImportFavorites = () => {
  const exportFavorites = async () => {
    const { data, error } = await supabase.from('favorites').select('*');
    if (error) {
      console.error('Error exporting favorites:', error);
      return;
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favorites.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFavorites = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const text = await file.text();
    try {
      const favorites = JSON.parse(text);
      const { error } = await supabase.from('favorites').insert(favorites);
      if (error) {
        console.error('Error importing favorites:', error);
      } else {
        alert('Favorites imported successfully!');
      }
    } catch (e) {
      console.error('Invalid JSON file:', e);
    }
  };

  return (
    <div>
      <button onClick={exportFavorites}>Export Favorites</button>
      <input type="file" accept="application/json" onChange={importFavorites} />
    </div>
  );
};

export default ExportImportFavorites;
