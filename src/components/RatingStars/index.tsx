import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import {Star, StarContainer} from "./styles";

const RatingStars: React.FC<{ onRate: (rating: number) => void }> = ({ onRate }) => {
    const [hover, setHover] = useState<number | null>(null);
    const [rating, setRating] = useState<number>(0);

    return (
        <StarContainer>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    filled={star <= (hover ?? rating)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => {
                        setRating(star);
                        onRate(star);
                    }}
                >
                    <FaStar />
                </Star>
            ))}
        </StarContainer>
    );
};

export default RatingStars;
