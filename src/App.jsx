import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [userdata, setuserdata] = useState([])
  const [index, setindex] = useState(1)

  async function getdata() {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=15`
    )

    setuserdata(response.data)
  }
useEffect(function(){
  getdata()
},[index])

  let printuserdata = <div className="flex flex-col items-center justify-center mt-20 gap-4">
  <div className="w-12 h-12 border-4 border-zinc-700 border-t-white rounded-full animate-spin"></div>

  <h2 className="text-center text-2xl font-bold text-zinc-300 tracking-wide animate-pulse">
    Images Loading, Please Wait...
  </h2>
</div>

  if (userdata.length > 0) {
    printuserdata = userdata.map(function (elem, idx) {
      return (
        <a href={elem.url} target='_blank'><div
  key={idx}
  className="w-72 bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 border border-zinc-800"
>
  <img
    src={elem.download_url}
    alt="Hello"
    className="w-full h-52 object-cover"
  />

  <div className="p-4">
    <h3 className="text-white font-semibold text-lg">
      {elem.author}
    </h3>

    <p className="text-zinc-400 text-sm mt-1">
      Image by Picsum
    </p>
  </div>
</div></a>
      )
    })
  }

  return (

    <div className='bg-black h-screen text-white p-4 overflow-auto w-full items-center justify-center content-center'>

 <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-widest uppercase text-center">
    Project : 02
  </h1>
<h1 className="text-4xl md:text-2xl  text-white tracking-widest uppercase text-center">
    Image Gallery
  </h1>
  <p className="text-gray-400 mt-2 text-lg text-center">
    By Saad Qayyum
  </p>
      <div className="flex flex-wrap gap-6 mt-8 justify-center">
  {printuserdata}
</div>
<div className="flex justify-center items-center gap-6 p-6">
  <button className="px-6 py-3 rounded-xl bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 active:scale-95 transition-all duration-200 shadow-lg" onClick={
   ()=>{
setuserdata([])
    if(index>=2)
    {
      setindex(index-1)
    }
   
   
   }
  }>
    ← Prev
  </button>



<h2 className="px-5 py-2 bg-zinc-900 text-white text-xl font-bold rounded-xl border border-zinc-700 shadow-lg">
  Page {index}
</h2>

  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg" onClick={
   ()=>{
    setuserdata([])
    setindex(index+1)
   
   }
  }>
    Next →
  </button>
</div>
    </div>
  )
}

export default App