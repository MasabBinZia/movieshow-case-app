import React from 'react'

const auth = () => {
    return (
        <div className='relative 
        h-full w-full 
        bg-[url(/images/hero.jpg)] 
        bg-no-repeat
        bg-center 
        bg-fixed
        bg-cover
        '>
            <div className='bg-black w-full h-full lg:bg-opacity-50'>
                <nav className='px-12 py-5'>
                    <img src='/images/logo.png' alt='logo'
                        className='h-12 '
                    />
                    <div className='flex justify-center'>
                        <div className='bg-black bg-opacity-70 px-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>

                        </div>

                    </div>

                </nav>
{/* 14:42 */}
            </div>


        </div>
    )
}

export default auth