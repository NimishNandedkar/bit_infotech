import React from 'react'


export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl">
           {/* adding back ground of video */}
           <video autoPlay loop muted className="w-full h-screen object-cover">
                <source src='src/assets/booksBackground.mp4' type="video/mp4" />
            </video>
        </div>
    );
}