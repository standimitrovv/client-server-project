import { Navbar } from './components/Navbar';

export default function Home() {
  return (
    <>
      <main className='px-6 w-full xl:max-w-7xl m-auto '>
        <Navbar />
      </main>

      <div className='border-b-2' />
    </>
  );
}
