import React, { useState, useEffect } from 'react';
import './toast.css';

export default function Toast({status, setStatus, isSuccess}){
  const [visible, setVisible] = useState(status);
  useEffect(() => {
    setVisible(status)
  }, [status]);
  const onAnimationEnd = () => {
    setStatus(false);
    setVisible(false);
  };
  return (
    <>
      {visible && (
        <div
          className={`
            fixed bottom-0 h-[50px] w-[225px] bg-gray-100 left-[50%]
            transform translate-x-[-50%] mb-20 z-[101] rounded
            flex justify-center items-center opacity-0
            border-solid border-2 fade-out-up
            ${isSuccess ? 'border-green-400' : 'border-red-400'}
          `}
          onAnimationEnd={onAnimationEnd}
        >
          {isSuccess ? 'Success! Cart updated.' : 'Server Error! Cart not updated.'}

        </div>
      )}
    </>
  )
}
