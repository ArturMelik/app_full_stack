import React from 'react';

// Este componente recibe el número de valoración (ej: 4)
function StarRating({ rating }) {
  // esto hace que el rating sea un número entre 0 y 5
  const starsCount = Math.min(5, Math.max(0, rating || 0)); 
  
  // repeat() se usa para crear varias estrellas según el rating.
  const solidStars = '★'.repeat(starsCount);
  const emptyStars = '☆'.repeat(5 - starsCount);

  return (
    <span style={{ color: '#FFD700', fontSize: '1.2em' }}>
      {solidStars}
      <span style={{ color: '#ccc' }}>{emptyStars}</span>
    </span>
  );
}

export default StarRating;