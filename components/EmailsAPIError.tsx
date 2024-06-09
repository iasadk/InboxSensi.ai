import React from 'react'

type Props = {
    retryFn: ()=> void
}

const EmailsAPIError = ({retryFn}: Props) => {
  return (
    <div className='flex flex-col justify-center mt-28 gap-y-6'>
        <p className='text-xl font-semibold text-center'>
            Failed to fetch your emails.
        </p>
        <span className='underline text-blue-500 text-center cursor-pointer' onClick={retryFn}>Try agian</span>
    </div>
  )
}

export default EmailsAPIError