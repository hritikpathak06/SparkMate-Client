import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import React, { useState } from 'react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      name: 'Courtney & Miranda',
      text: 'Thanks to Tinder I have found the love of my life and we are to be married.\nAfter going on a few dates and having a few fun nights I came across Miranda. After reading her profile I couldn\'t resist swiping right after reading her final sentence...\n\'Looking for my super babe for life.\' After talking for about a week we went out on our first date and I knew there was something special about her!'
    },
    {
      name: 'Gabriel & Fiance',
      text: 'I met my fiance on tinder during the quarantine for COVID. She is from Lafayette, Indiana and I am from Cleveland, Ohio. We are both Christians who fell madly in love.'
    },
    {
      name: 'Kenneth & Elliot',
      text: 'I honestly had been on many Tinder dates and was absolutely sure I was meeting a fling to get a free meal and have some fun...3 years and sooo many dates and memories later, I am married to my Tinder guy, Kenny!'
    },
    {
      name: 'Samantha & Thomas',
      text: 'Tinder changed my life! I swiped right on Thomas and we instantly connected. We\'ve been together for 5 years now and just bought our first home. I\'m so grateful to have found my soulmate on this app.'
    },
    {
      name: 'Emily & David',
      text: 'After a string of disappointing dates, I almost gave up on Tinder. But then I matched with David and we\'ve been inseparable ever since. He\'s the kindest, most caring person I\'ve ever met and I can\'t wait to start our life together.'
    },
    {
        name: 'Kenneth & Elliot',
        text: 'I honestly had been on many Tinder dates and was absolutely sure I was meeting a fling to get a free meal and have some fun...3 years and sooo many dates and memories later, I am married to my Tinder guy, Kenny!'
      },
  ];

  const handleScroll = (direction:any) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    } else {
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    }
  };

  return (
    <div className="bg-black text-white py-8">
      <div className="container mx-auto px-4 relative">
        <button
          className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400 hover:text-white"
          onClick={() => handleScroll('left')}
        >
          <ArrowLeftIcon className="w-6 h-6 hidden md:block" />
        </button>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400 hover:text-white"
          onClick={() => handleScroll('right')}
        >
          <ArrowRightIcon className="w-6 h-6 hidden md:block"
 />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
            <div key={index} className="bg-gray-900 min-h-[40vh] rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">{testimonial.name}</h3>
              <p className="text-gray-400 leading-relaxed">{testimonial.text.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;