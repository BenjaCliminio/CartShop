import React from 'react'

function Products(name, calification, description, price, image) {
  return (
    <div className='flex justify-center'>
      <img src={image} />
      <h4 className='font-bold mt-3'>{name}</h4>
      <p className='mt-5 mb-4'>{calification}</p>
      <p>{description}</p>
     <div className='flex justify-center'>
      <p>{price}</p>
     </div>
    </div>
  )
}

export default Products