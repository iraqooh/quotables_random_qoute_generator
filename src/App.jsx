import React, { useEffect, useState } from 'react'
import { supabase } from './supabase/client'
import Home from './pages/Home'
import Auth from './auth/Auth'

import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faRecycle, faCopy, faHeart, faPlay } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'

library.add(fas, faTwitter, faFontAwesome, faRecycle, faCopy, faHeart, faPlay)

function App() {
  // const [session, setSession] = useState(null)
  // const [theme, setTheme] = useState('light')

  // useEffect(() => {
  //   // Get the session on mount
  //   const getSession = async () => {
  //     const { data, error } = await supabase.auth.getSession()
  //     setSession(data?.session ?? null)
  //   }

  //   getSession()

  //   // Subscribe to auth changes
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session)
  //   })

  //   return () => subscription.unsubscribe()
  // }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-500 to-white p-4 font-sans flex justify-center">
      <Home />
    </div>
  )
}

export default App
