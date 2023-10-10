import DeleteIcon from '../assets/images/icon-delete.svg';

const Delete = () => {
    return (
        <button className='flex flex-row justify-center items-center'>
            <img src={DeleteIcon} />
            <p className='ms-1 text-moderate-blue bg-white'>Delete</p>
        </button>
    )
}

export default Delete;