import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [userdata, setuserdata] = useState([])
  const [index, setindex] = useState(1)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [query, setQuery] = useState('')

  const submitSearch = () => {
    if (searchTerm.trim().length === 0) {
      return
    }
    setindex(1)
    setQuery(searchTerm.trim())
  }

  const downloadImage = async (url, filename) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const getdata = async () => {
    setLoading(true)
    try {
      const endpoint = query ? 'https://api.pexels.com/v1/search' : 'https://api.pexels.com/v1/curated'
      const params = query
        ? { query, page: index, per_page: 15 }
        : { page: index, per_page: 15 }

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: 'AASagXdpsinm3TU8HCVwM3EbQKNbm7523VjovZ9RNT7jaxCuHhg3zb8R'
        },
        params
      })
      setuserdata(response.data.photos || [])
    } catch (error) {
      console.error('Failed to fetch images:', error)
      setuserdata([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getdata()
  }, [index, query])

  let printuserdata = (
    <div className="flex flex-col items-center justify-center mt-20 gap-4">
      <div className="w-12 h-12 border-4 border-zinc-700 border-t-white rounded-full animate-spin"></div>
      <h2 className="text-center text-2xl font-bold text-zinc-300 tracking-wide animate-pulse">
        Images Loading, Please Wait...
      </h2>
    </div>
  )

  if (!loading && userdata.length === 0) {
    printuserdata = (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <h2 className="text-center text-2xl font-bold text-zinc-300 tracking-wide">
          No images available.
        </h2>
      </div>
    )
  }

  if (userdata.length > 0) {
    printuserdata = userdata.map((elem) => {
      return (
        <div key={elem.id} className="w-72 bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 border border-zinc-800">
          <a href={elem.url} target="_blank" rel="noreferrer">
            <img
              src={elem.src.large}
              alt={elem.alt || elem.photographer}
              className="w-full h-52 object-cover"
            />
          </a>
          <div className="p-4">
            <div>
              <h3 className="text-white font-semibold text-lg">{elem.alt || 'Untitled image'}</h3>
              <p className="text-zinc-400 text-sm mt-1">Uploaded by Pexels</p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-zinc-400 text-sm">Download original</span>
              <button
                onClick={() => downloadImage(elem.src.original, `${elem.id}.jpg`)}
                className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
                type="button"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="bg-black h-screen text-white p-4 overflow-auto w-full items-center justify-center content-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-widest uppercase text-center">
        Project : 02
      </h1>
      <h1 className="text-4xl md:text-2xl text-white tracking-widest uppercase text-center">
        Image Gallery
      </h1>
      <p className="text-gray-400 mt-2 text-lg text-center">By Saad Qayyum</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-4">
        <div className="w-full max-w-2xl px-4">
          <label htmlFor="search" className="sr-only">
            Search images
          </label>
          <div className="flex rounded-full border border-zinc-700 bg-zinc-900 p-1 shadow-lg">
            <input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  submitSearch()
                }
              }}
              placeholder="Search images by name..."
              className="w-full rounded-full bg-transparent px-4 py-3 text-white outline-none placeholder:text-zinc-500"
            />
            <button
              onClick={submitSearch}
              className="rounded-full bg-amber-500 px-5 py-3 text-black font-semibold transition hover:bg-amber-400"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 mt-8 justify-center">{printuserdata}</div>
      <div className="flex justify-center items-center gap-6 p-6">
        <button
          className="px-6 py-3 rounded-xl bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 active:scale-95 transition-all duration-200 shadow-lg"
          onClick={() => {
            if (index >= 2) {
              setindex(index - 1)
            }
          }}
        >
          ← Prev
        </button>
        <h2 className="px-5 py-2 bg-zinc-900 text-white text-xl font-bold rounded-xl border border-zinc-700 shadow-lg text-center">
          Page {index}
        </h2>
        <button
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
          onClick={() => {
            setindex(index + 1)
          }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default App