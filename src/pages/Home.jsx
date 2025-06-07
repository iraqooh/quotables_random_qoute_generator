import { useState, useEffect } from 'react'
import axios from 'axios'
import { supabase } from '../supabase/client'
import QuoteCard from '../components/QuoteCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Home({ session }) {
    const [quote, setQuote] = useState(null)

    const fetchQuote = async () => {
        const res = await axios.get('https://favqs.com/api/qotd', {
            header: {
                // "Access-Control-Allow-Origin": ""
            }
        })
        setQuote(res.data.quote)
        console.log(quote);
        
    }

    const handleFavorite = async () => {
        if (!quote) return
        await supabase.from('favorites').insert([{
            user_id: session.user.id,
            quote_id: quote.id,
            quote: quote.body,
            author: quote.author
        }])
    }

    useEffect(() => {
        fetchQuote()
    }, [])


    return (
        <div className="space-y-4">
            {quote && <QuoteCard quote={quote} onFavorite={handleFavorite}/>}
            <div className="w-full max-w-4xl space-y-12">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="">
                <h1 className="text-4xl font-extrabold tracking-wide">Quotables</h1>
                <p className="text-sm">Discover wisdom from great minds</p>
            </div>
            <div className="flex items-center gap-2">
                <button id="favorites-btn" className="cursor-pointer flex items-center border gap-1 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-sm">
                    <FontAwesomeIcon icon={"fa-solid fa-heart"} className='mr-2'/>
                    <span>Favorites (<span id="favorites-count">0</span>)</span>
                </button>
                <button id="preferences-btn" className="cursor-pointer flex items-center border gap-1 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-sm">
                    <FontAwesomeIcon icon={"fa-solid fa-gear"} />
                </button>
            </div>
            </header>
            {/* Quote card */}
            <QuoteCard />
        </div>
        </div>
    )
}

export default Home