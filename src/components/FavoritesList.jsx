import { useEffect, useState } from 'react';
import supabase from '../supabase/client';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching favorites:', error);
      } else {
        setFavorites(data);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Your Favorites</h2>
      <ul>
        {favorites.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
