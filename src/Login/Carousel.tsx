import { ReactComponent as Graphic1 } from "../Graphics/Chef-amico.svg";
import { ReactComponent as Graphic2 } from "../Graphics/Chef-bro.svg";
import { ReactComponent as Graphic3 } from "../Graphics/Hamburger-bro.svg";
import "../css/Carousel.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const Carousel = () => {
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1); // Change slide every 3 seconds
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [page]);

  const slides = [<Graphic1 />, <Graphic2 />, <Graphic3 />];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // const index = (page + slides.length) % slides.length;
  const index = ((page % slides.length) + slides.length) % slides.length;

  const swipeConfidenceThreshold = 100;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  const handleSwipe = (offsetX: number, velocityX: number) => {
    const swipe = swipePower(offsetX, velocityX);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1); // Swipe left → next
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1); // Swipe right → prev
    }
  };
  return (
    <>
      <div className="slider-wrapper">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            className="slider-slide"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, { offset, velocity }) =>
              handleSwipe(offset.x, velocity.x)
            }
          >
            {slides[index]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="slider-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > page ? 1 : -1])}
            className={`slider-dot ${i === index ? "active" : ""}`}
          />
        ))}
      </div>
    </>
  );
};

export default Carousel;
