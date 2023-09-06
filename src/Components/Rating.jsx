const Rating = ({rating}) => {
    return (
        <div className='flex bg-light-gray rounded p-1 h-fit space-x-3'>
            <button>+</button>
            <p>{rating}</p>
            <button>-</button>
        </div>
    )
}

export default Rating;