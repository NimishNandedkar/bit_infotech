// import React, { useState, useEffect } from 'react'
// import { CardBody } from '@material-tailwind/react'

// import { ChevronLeft, ChevronRight } from "react-feather"

// const Carousel = ({ children: slides = [], autoSlide = false, autoSlideInterval = 5000 }) => {
//     const [curr, setCurr] = useState(0)

//     const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))

//     const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

//     useEffect(() => {
//         if (!autoSlide) return
//         const slideInterval = setInterval(next, autoSlideInterval)
//         return () => clearInterval(slideInterval)
//     }, [])

//     return (
//         <div className='overflow-clip relative rounded-t-lg'>
//             {/* <div className='flex transition-transform ease-out duration-500' style={{ transform: `translateX(-${curr * 100}%)` }}> */}
//             <div className='flex transition-transform ease-out duration-500'>
//                 {slides}
//             </div>
//             <div className="absolute inset-0 flex items-center justify-between p-4">
//                 <button onClick={prev} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
//                     <ChevronLeft />
//                 </button>
//                 <button onClick={next} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
//                     <ChevronRight />
//                 </button>
//             </div>
//             {/* <CardBody className='p-4'>
//                 <h2 className="text-2xl font-semibold my-2">hvhh</h2>
//                 <p className="text-gray-500">bjj</p>
//                 <a href="#" className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                     Read more
//                     <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
//                     </svg>
//                 </a>
//             </CardBody> */}

//             <div className='absolute bottom-4 right-0 left-0'>
//                 <div className='flex items-center justify-center gap-2'>
//                     {slides.map((s, i) => (
//                         <div key={i} className={`transition-all w-1.5 h-1.5 bg-white rounded-full  ${curr === i ? "p-0.5" : "bg-opacity-50"}`} />
//                     ))}
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default Carousel