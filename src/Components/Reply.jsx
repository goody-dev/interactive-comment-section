import ReplyIcon from '../assets/images/icon-reply.svg';

const Reply = () => {
    return (
        <button className='flex flex-row justify-center items-center'>
            <img src={ReplyIcon} />
            <p className='ms-1 text-moderate-blue bg-white'>Reply</p>
        </button>
    )
}

export default Reply;