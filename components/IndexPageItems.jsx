// components/IndexPageItems.js
import React from 'react';

export default function IndexPageItems({ heading, subheading, media, body ,isBoardImage}) {
  return (
      <>
      {heading && <div className="text-4xl font-extrabold">{heading}</div>}
      {subheading && <div className="text-2xl font-bold">{subheading}</div>}
      <div className="text-2xl opacity-80" dangerouslySetInnerHTML={{ __html: body }} />
      {media && (
        <div className="mt-4 flex items-center justify-center">
          {media.includes('.mp4') ? (
            <video autoPlay loop width="100%" height="auto">
              <source src={media} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={media} alt="Media" className={isBoardImage?'pl-[50px] pr-[50]px h-[800px]':"w-full h-[1200px]"} />
          )}
        </div>
      )}
      </>
  )
}
