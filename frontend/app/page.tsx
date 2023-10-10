'use client'
import Header from '@/components/Header'
import Image from 'next/image'

export default function Home() {
  return (
    <main >
      <Header/>
      <div className='relative w-screen h-screen z-0'>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-center z-10 bg-black opacity-50">
        <div className='absolute left-[15%]'>
          <h2 className='text-white text-3xl'>VistaFit</h2>
          <p className="text-white text-2xl">Crée un programme de musculation <br></br>et suivez votre progression!</p>
        </div>
      </div>
        <video autoPlay muted loop className="w-full h-full object-cover absolute top-0 left-0 z-0">
          <source src="/videos/home.mp4" type="video/mp4" />
          Votre navigateur ne prend pas en charge la vidéo HTML5.
        </video>
      </div>
    </main>
  )
}
