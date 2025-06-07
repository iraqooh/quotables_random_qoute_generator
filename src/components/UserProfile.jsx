// src/components/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) return null;

  return (
    <div>
      <img src={user.user_metadata.avatar_url} alt="User Avatar" width={50} />
      <p>{user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default UserProfile;
