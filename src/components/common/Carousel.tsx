import React, { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode[];
  autoplayDelay?: number; // ms
  showArrows?: boolean;
  showIndicators?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  autoplayDelay = 4000,
  showArrows = true,
  showIndicators = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  // Autoplay implementation
  useEffect(() => {
    if (!emblaApi || !autoplayDelay) return;

    let intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayDelay);

    return () => clearInterval(intervalId);
  }, [emblaApi, autoplayDelay]);

  return (
    <div className="embla group relative w-full rounded-md shadow-sm overflow-hidden bg-white">
      <div className="embla__viewport w-full" ref={emblaRef}>
        <div className="embla__container flex w-full">
          {children.map((child, index) => (
            <div className="embla__slide min-w-full flex-shrink-0" key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && children.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-16 bg-white/90 hover:bg-white text-gray-800 shadow-md rounded-r-md border border-l-0 border-gray-200 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:outline-none z-10"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-16 bg-white/90 hover:bg-white text-gray-800 shadow-md rounded-l-md border border-r-0 border-gray-200 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:outline-none z-10"
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {showIndicators && children.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex ? 'bg-brand-blue w-4' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
