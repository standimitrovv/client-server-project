import Image from 'next/image';
import img1 from '../images/gallery/img1.jpg';
import img2 from '../images/gallery/img2.jpg';
import img3 from '../images/gallery/img3.jpg';
import img4 from '../images/gallery/img4.jpg';
import img5 from '../images/gallery/img5.jpg';
import img6 from '../images/gallery/img6.jpg';
import img7 from '../images/gallery/img7.jpg';
import img8 from '../images/gallery/img8.jpg';
import img9 from '../images/gallery/img9.jpg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

export default function Gallery() {
  return (
    <section id='gallery'>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {images.map((i, index) => (
          <Image
            key={index}
            src={i}
            alt={`Image №${index}`}
            className='sm:w-80 sm:h-80 sm:justify-self-center'
          />
        ))}
      </div>
    </section>
  );
}
