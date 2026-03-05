import React, { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react"

const Card = ({ images = [], title, price }) => {

    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 📌 Update index on scroll
    const handleScroll = () => {
        const slider = scrollRef.current;
        const index = Math.round(
            slider.scrollLeft / slider.clientWidth
        );
        setCurrentIndex(index);
    };

    // ➡ Next Image
    const scrollNext = () => {
        const slider = scrollRef.current;
        const nextIndex = Math.min(currentIndex + 1, images.length - 1);

        slider.scrollTo({
            left: nextIndex * slider.clientWidth,
            behavior: "smooth"
        });

        setCurrentIndex(nextIndex);
    };

    // ⬅ Previous Image
    const scrollPrev = () => {
        const slider = scrollRef.current;
        const prevIndex = Math.max(currentIndex - 1, 0);

        slider.scrollTo({
            left: prevIndex * slider.clientWidth,
            behavior: "smooth"
        });

        setCurrentIndex(prevIndex);
    };

    return (
        <div className='card w-[300px] h-[450px] max-w-[90%] flex items-start justify-center flex-col gap-1'>

            <div className="relative w-full h-[65%]">

                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="images w-full h-full overflow-x-auto
                    flex rounded-xl scroll-smooth snap-x snap-mandatory"
                >
                    {images.map((img, index) => (
                        <img
                            key={index}
                            className='min-w-full h-full object-cover shrink-0 snap-start'
                            src={img}
                            alt={`property-${index}`}
                        />
                    ))}
                </div>

                {/* ⬅ Left Arrow */}
                {currentIndex > 0 && (
                    <button
                        onClick={scrollPrev}
                        className="absolute top-1/2 left-2 -translate-y-1/2
            bg-white/80 backdrop-blur-sm p-2 rounded-full
            shadow-md hover:scale-110 transition cursor-pointer"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}

                {/* ➡ Right Arrow */}
                {currentIndex < images.length - 1 && (
                    <button
                        onClick={scrollNext}
                        className="absolute top-1/2 right-2 -translate-y-1/2
            bg-white/80 backdrop-blur-sm p-2 rounded-full
            shadow-md hover:scale-110 transition cursor-pointer"
                    >
                        <ChevronRight size={20} />
                    </button>
                )}

            </div>

            <span className="font-semibold text-xl">{title}</span>
            <span className="text-gray-600">{price}</span>

        </div>
    )
}

export default Card