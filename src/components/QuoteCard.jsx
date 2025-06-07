import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function QuoteCard({ quote, onFavorite }) {
  return (
    <>
      <main className="bg-gradient-to-br from-white to-slate-400 backdrop-blur-md p-6 rounded-xl shadow-lg">
        <blockquote id="quote-text" className="text-xl sm:text-2xl italic text-center mb-4">
            {quote || "Oops! Failed to load ."}
        </blockquote>
        <p className="text-center mb-6"> <span id="quote-author" className="italic font-medium">{quote || ""}</span></p>

        {/*  Button Actions  */}
        <div className="flex flex-wrap justify-center gap-3">
            <button id="new-quote" className="cursor-pointer px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition">
            <FontAwesomeIcon icon="fa-solid fa-recycle" className='mr-2'/> New Quote
            </button>
            <button id="copy-quote" className="cursor-pointer px-6 py-2 rounded-full bg-black text-white hover:bg-white/20 hover:text-black transition">
            <FontAwesomeIcon icon="fa-solid fa-copy" className='mr-2'/> Copy
            </button>
            <button id="share-quote" className="cursor-pointer px-6 py-2 rounded-full bg-black text-white  hover:bg-white/20 hover:text-black transition">
            <FontAwesomeIcon icon="fa-brands fa-twitter" className='mr-2'/> Share
            </button>
            <button id="favorite-quote" className="cursor-pointer px-6 py-2 rounded-full bg-black text-white  hover:bg-white/20 hover:text-black transition" onClick={onFavorite}>
              <FontAwesomeIcon icon="fa-solid fa-heart" className='mr-2'/> Favorite
            </button>
        </div>
      </main>
      {/* Auto refresh section */}
      <section className="bg-gradient-to-br from-white to-slate-400 backdrop-blur-md p-4 rounded-xl shadow">
        <label htmlFor="refresh-interval" className="block text-center mb-3 text-sm">
            <FontAwesomeIcon icon={"fa-solid fa-clock"} /> Auto-refresh:
        </label>
        <div className="flex flex-wrap justify-center gap-3">
            <button id="auto-refresh-toggle" className="cursor-pointer px-4 py-2 rounded-md bg-black text-white  hover:bg-white/20 transition">
            <FontAwesomeIcon icon="fa-solid fa-play" className='mr-2'/> Start
            </button>
            <select id="refresh-interval" className="px-4 py-2 rounded-md bg-black  text-white focus:text-white">
            <option value="10" defaultValue>10s</option>
            <option value="30">30s</option>
            <option value="60">60s</option>
            <option value="120">2 min</option>
            </select>
        </div>
      </section>
    </>
  )
}

export default QuoteCard