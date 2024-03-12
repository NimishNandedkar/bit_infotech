import React from 'react'

function Cards() {
    return (
        <>
            <div class="card transform scale-100 hover:scale-110 transition-transform duration-500 ease-in-out border rounded-lg max-w-250 h-350 bg-opacity-50 bg-purple-500 relative p-4 overflow-hidden flex flex-col justify-end text-white">
                <div class="cardHeader uppercase relative font-bold transition-all duration-500 ease-in-out">
                    <div class="after"></div>
                </div>
                <div class="details z-2 flex flex-col gap-5 transform translate-y-95 transition-all duration-500 ease-in-out">
                </div>
            </div>
        </>
    )
}

export default Cards