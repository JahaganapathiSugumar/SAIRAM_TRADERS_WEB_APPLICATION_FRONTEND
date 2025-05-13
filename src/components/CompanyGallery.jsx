import { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { LanguageContext } from '../context/LanguageContext';

const galleryImages = [
  {
    url: 'https://i.postimg.cc/wBQ1NK9t/IMG20250510110029.jpg',
    title: 'Showroom Exterior'
  },
  {
    url: 'https://i.postimg.cc/1Rjfwr1K/IMG20250510110238.jpg',
    title: 'Interior Display'
  },
  {
    url: 'https://i.postimg.cc/25G564xh/IMG20250510110302.jpg',
    title: 'Custom Color Mixing Available'
  },
  {
    url: 'https://res.cloudinary.com/dyxu6ylng/image/upload/v1747054526/IMG20250510110228_bc5y1x.jpg',
    title: 'Wide Range of Products'
  }
];

const CompanyGallery = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            {translations?.ourGallery || 'Our Gallery'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {translations?.gallerySubtitle || 'Take a tour of our showroom and see our professional team in action'}
          </p>
        </div>

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper rounded-lg overflow-hidden"
        >
          {galleryImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[500px]">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-2xl font-bold">{image.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CompanyGallery;