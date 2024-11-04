// import React, { useState, useRef } from 'react';

// const SwipeCard = () => {
//   // Sample data for cards
//   const [cards, setCards] = useState([
//     { id: 1, text: 'Card 1' },
//     { id: 2, text: 'Card 2' },
//     { id: 3, text: 'Card 3' },
//     { id: 4, text: 'Card 4' },
//   ]);
//   const [currentIndex, setCurrentIndex] = useState(0); // Current card index
//   const [position, setPosition] = useState({ x: 0, y: 0 }); // Card position
//   const [isAnimating, setIsAnimating] = useState(false); // Animation state
//   const startPos = useRef({ x: 0, y: 0 }); // Initial touch/mouse position

//   // Handle touch/mouse start
//   const handleStart = (e) => {
//     const x = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
//     startPos.current = { x };
//     setIsAnimating(false);
//   };

//   // Handle touch/mouse move
//   const handleMove = (e) => {
//     const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
//     const dx = x - startPos.current.x;
//     setPosition({ x: dx, y: 0 });
//   };

//   // Handle touch/mouse end
//   const handleEnd = () => {
//     // If swiped far enough right
//     if (position.x > 100) {
//       swipeRight();
//     }
//     // If swiped far enough left
//     else if (position.x < -100) {
//       swipeLeft();
//     } else {
//       // Reset position if no swipe
//       setPosition({ x: 0, y: 0 });
//     }
//   };

//   // Swipe left action
//   const swipeLeft = () => {
//     setIsAnimating(true);
//     setPosition({ x: -window.innerWidth, y: 0 });
//     setTimeout(() => {
//       setCurrentIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
//       setPosition({ x: 0, y: 0 });
//       setIsAnimating(false);
//     }, 300);
//   };

//   // Swipe right action
//   const swipeRight = () => {
//     setIsAnimating(true);
//     setPosition({ x: window.innerWidth, y: 0 });
//     setTimeout(() => {
//       setCurrentIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
//       setPosition({ x: 0, y: 0 });
//       setIsAnimating(false);
//     }, 300);
//   };

//   return (
//     <div style={styles.container}>
//       {currentIndex < cards.length && (
//         <div
//           style={{
//             ...styles.card,
//             transform: `translate(${position.x}px, ${position.y}px)`,
//             transition: isAnimating ? 'transform 0.3s ease' : 'none',
//           }}
//           onTouchStart={handleStart}
//           onTouchMove={handleMove}
//           onTouchEnd={handleEnd}
//           onMouseDown={handleStart}
//           onMouseMove={(e) => isAnimating || handleMove(e)}
//           onMouseUp={handleEnd}
//           onMouseLeave={isAnimating ? null : handleEnd}
//         >
//           {cards[currentIndex].text}
//         </div>
//       )}
//     </div>
//   );
// };

// const styles:any = {
//   container: {
//     position: 'relative',
//     width: '100vw',
//     height: '100vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//   },
//   card: {
//     width: '300px',
//     height: '400px',
//     backgroundColor: '#f9c74f',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: '10px',
//     fontSize: '24px',
//     color: '#fff',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//     position: 'absolute',
//   },
// };

// export default SwipeCard;
