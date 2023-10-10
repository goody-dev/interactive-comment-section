import EditIcon from '../assets/images/icon-edit.svg';

const Edit = () => {
    return (
        <button className='flex flex-row justify-center items-center ms-3'>
            <img src={EditIcon} />
            <p className='ms-1 text-moderate-blue bg-white'>Edit</p>
        </button>
    )
}

export default Edit;