import React from 'react';

interface CardProps {
  src: string; // Define imageUrl as a string type
  content: string;
  imageStyle?: React.CSSProperties; // Define imageStyle prop
  contentStyle?: React.CSSProperties; 
}

const Card: React.FC<CardProps> = ({ src, content }) => {
  return (
    <div className="card">
  <img src={src} alt="Card" className="card-image" />
  <p className="card-content text-2xl font-bold mt-4">{content}</p>
</div>

  );
}

export default Card;