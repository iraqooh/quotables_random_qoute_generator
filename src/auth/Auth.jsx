import React from 'react'
import { supabase } from '../supabase/client'

function Auth() {
    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({ provider: 'github' })
    }

    return (
        <div className="flex flex-column justify-center items-center h-screen">
            <div className="font-bold text-xl">Welcome to Quotables</div>
            <button onClick={handleLogin} className="bg-black text-white px-4 py-2 rounded">
                Sign in with GitHub
            </button>
        </div>
    )
}

export default Auth