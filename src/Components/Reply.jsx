import React from 'react';
import Timestamp from 'react-timestamp';

import Rating from './Rating';
import ReplyButton from './ReplyButton.jsx';
import DeleteButton from './DeleteButton.jsx';
import EditButton from './EditButton.jsx';

const Reply = ({...props}) => {
    return (
        <div className='mx-auto md:max-w-lg'>
            <div className="md:hidden bg-white w-auto space-y-3 shadow-lg flex flex-col my-5 rounded p-5">
                <div className='flex w-fit space-x-4 content-center items-center'>
                    <img src={props.img} className='h-6' alt="User Avatar" />
                    <p className="text-dark-blue">{props.username}</p>
                    {props.currentUser === props.username && <YouTag/>}
                    <p className="text-grayish-blue"><Timestamp relative date={props.createdAt}  autoUpdate/></p>
                </div>
                <div className=''>
                    <p className='text-grayish-blue'>{props.content}</p>
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <Rating rating={props.rating} onRate={props.onRate} id={props.id}/>
                    {props.currentUser !== props.username?
                    <ReplyButton />:
                    <div className='flex flex-row justify-center items-center'>
                        <DeleteButton />
                        <EditButton />
                    </div>}
                </div>
            </div>
            <div className="hidden md:flex md:flex-row bg-white mx-auto max-w-[90%] md:max-w-lg md:align-top md:space-x-4 shadow-lg m-5 rounded p-5">
                <div className='md:block w-fit space-x-4'>
                    <Rating rating={props.rating} onRate={props.onRate} id={props.id}/>
                </div>
                <div className='flex flex-col space-y-3'>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex w-fit space-x-3 content-center items-center'>
                            <img src={props.img} className='h-6' alt="User Avatar" />
                            <p className="text-dark-blue">{props.username}</p>
                            {props.currentUser === props.username && <YouTag/>}
                            <p className="text-grayish-blue"><Timestamp relative date={props.createdAt}  autoUpdate/></p>
                        </div>
                        {props.currentUser !== props.username?
                        <ReplyButton />:
                        <div className='flex flex-row justify-center items-center'>
                            <DeleteButton />
                            <EditButton />
                        </div>}
                    </div>
                    <div>
                        <p className='text-grayish-blue'>{props.content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const YouTag = () => {
    return (
        <button className='text-xs rounded bg-moderate-blue px-2 py-[0.7px] text-white'>
            you
        </button>
    )
}

export default Reply;
