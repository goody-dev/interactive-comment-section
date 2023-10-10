import PlusIcon from '../assets/images/icon-plus.svg';
import MinuIcon from '../assets/images/icon-minus.svg';
import { useState, useEffect } from 'react';

const Rating = ({rating, onRate, id}) => {
    const [score, setScore] = useState(rating);
    const [negativelyRated, setNegativelyRated] = useState(false);
    const [positivelyRated, setPositivelyRated] = useState(false);

    //To handle positive rating and remove prior negative rating
    const handlePositiveRating = () => {
        if(!positivelyRated) {
            setScore(score+1);
            setPositivelyRated(true);
            setNegativelyRated(false);
        }
    }

    //To handle negative rating and remove prior positive rating
    const handleNegativeRating = () => {
        if(!negativelyRated) {
            setScore(score-1);
            setNegativelyRated(true);
            setPositivelyRated(false);
        }
    }

    //To update state(single  of truth) immediately
    useEffect(()=>
        onRate(id, score)
    , [score])

    return (
        <div className='flex bg-light-gray rounded p-1 h-fit space-x-3'>
            <button onClick={handlePositiveRating}><img src={PlusIcon} /></button>
            <p className='text-moderate-blue'>{rating}</p>
            <button onClick={handleNegativeRating}><img src={MinuIcon} /></button>
        </div>
    )
}

export default Rating;