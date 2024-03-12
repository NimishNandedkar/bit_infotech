import { Card, CardBody } from '@material-tailwind/react'
import React from 'react'

function Blogs() {
  const imageUrl = "https://images.unsplash.com/photo-1682695795255-b236b1f1267d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <>
      <div className='container mx-auto my-4 px-4 rounded-lg'>
        <h1 className='text-5xl font-bold my-4'>Blogs</h1>
        <Card className='rounded-xl'>
          <img src={imageUrl} alt="blog" className="w-full h-80 object-cover rounded-t-xl" />
          <CardBody className='p-4'>
            <h2 className="text-2xl font-semibold my-2">Title</h2>
            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </CardBody>
        </Card>
        <div class="flex mt-5 space-x-5 mb-10">
          <div class="w-fit">
            <Card className='rounded-xl'>
              <img src={imageUrl} alt="blog" className="w-full h-80 object-cover rounded-t-xl" />
              <CardBody className='p-4'>
                <h2 className="text-2xl font-semibold my-2">Title</h2>
                <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </CardBody>
            </Card>

          </div>
          <div class="w-fit">
            <Card className='rounded-xl'>
              <img src={imageUrl} alt="blog" className="w-full h-80 object-cover rounded-t-xl" />
              <CardBody className='p-4'>
                <h2 className="text-2xl font-semibold my-2">Title</h2>
                <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </CardBody>
            </Card>

          </div>
        </div>
      </div>
    </>
  )
}

export default Blogs