'use client';

import Image from 'next/image';
import picOfMe from './images/me.jpg';

export default function Home() {
  return (
    <section
      id='home'
      className='flex flex-col md:flex-row md:justify-between w-full mb-8'
    >
      <div className='w-full md:w-[80%]'>
        <Image src={picOfMe} alt='profile picture' className='rounded-md' />
      </div>

      <div className='flex flex-col items-start mt-8 md:ml-20 md:justify-end md:items-end w-full mb-4'>
        <div className='mb-10 md:text-end'>
          <h1 className='text-4xl'>Hey there 👋,</h1>
          <h2 className='text-3xl'>I am Stan.</h2>
          <h1 className='text-4xl font-extrabold'>Self taught</h1>
          <h2 className='text-3xl'>Web developer.</h2>
        </div>
        <span>
          {' '}
          I&apos;m a 22-year-young web tech enthusiast on a knowledge joyride.
        </span>
        <span className='mb-4'>
          (Let&apos;s call it an insatiable love affair with learning! 🕵️‍♂️)
        </span>
        <span>Daytime problem-solver 👨‍💻, nighttime goal chaser 🏃‍♂️.</span>
      </div>
    </section>
  );
}
