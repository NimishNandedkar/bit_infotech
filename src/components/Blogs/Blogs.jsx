import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '@material-tailwind/react';

function Blogs() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.status);

  // ************************************

  // Sample blog data array fetched from the database
  const blogs = [
    {
      id: 1,
      title: 'Blog Title 1',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quibusdam.',
      imageUrl: 'https://picsum.photos/1800/700?random=1',
    },
    {
      id: 2,
      title: 'Blog Title 2',
      content: `Health is the condition of the human body which is free from any injury or illness. But staying healthy is defined as staying mentally, physically and socially fit. Maintaining good health will ultimately lead to a happy mind which is more valuable than any precious gift in today’s life. Having a healthy life must be a part of everyone’s lifestyle. If one has a healthy and happy mind, then one will always stay motivated towards one’s work and will be productive at work. It is essential for every individual to feel good about themselves, which will keep them happy. It is necessary to lead a healthy life to avoid any kind of chronic disease. To maintain a healthy life, a person can go running or take a morning walk, can exercise daily, and support healthy food habits. Therefore, it is essential to do what is suitable for your health and maintain good health from a very young age.

      Paragraph on Health in 200 Words
      Maintaining good health is not only about having a good physique and appearance. It is about self-satisfaction, inner peace and your behaviour. In today’s competitive era, maintaining a healthy mind and body is not so easy; but if you make it a habit from a young age, then you stay fit and healthy throughout your life. We might not understand the value of good health at a very young age, but health should be an individual’s first priority. It is only when an individual is healthy they can work dedicatedly along with extracurricular activities. It is the most valuable asset than food or money. Greed, dishonesty, and deceitful behaviour are the primary causes of sadness. As a result, it is essential that we inculcate positive ideals in ourselves and teach others to follow the same in order to spread happiness throughout the world. It is essential to maintain a healthy relationship with everyone that keeps you in a positive surrounding. It is necessary to spend some quality time with family and friends. This will not only keep you happy but also give you good energy.
      
      Paragraph on Health in 250 Words
      It is a blessing if a person is born with no health issues. Yet, no one should take advantage of being healthy and be overconfident. Being healthy is about having good physical health and being mentally and socially fit. A healthy person can be more focused and more determined and can lead a happy life. If we look into human history, the biggest asset to human beings is good health and a healthy mind. Good health and a calm mind are interrelated, which helps individuals grow intellectually and make them wealthy. A person with poor mental health is unable to sustain physical strength and stamina. Only a stress-free mind and a positive mindset may contribute to good physical health. This combination allows us to recognise and experience the actual eternal happiness that comes from the inside. We’re told as children that leading a healthy lifestyle can lead to the best health. However, only as we get older do we realise that introspection, self-awareness, and reflection of one’s own ideas are all essential aspects of sustaining excellent mental health, which may lead to a fit and lovely physique. When this method is missing, it might lead to a depressing thought process in which one fails to realise what is bothering them and what they are missing in particular. As a result, maintaining good health is critical for the general development of our personality and outlook on life.`,
      imageUrl: 'https://picsum.photos/1800/700?random=2',
    },
    {
      id: 3,
      title: 'Blog Title 3',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quibusdam.',
      imageUrl: 'https://picsum.photos/1800/700?random=3',
    },
    {
      id: 4,
      title: 'Blog Title 4',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quibusdam.',
      imageUrl: 'https://picsum.photos/1800/700?random=4',
    },
    {
      id: 5,
      title: 'Blog Title 5',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quibusdam.',
      imageUrl: 'https://picsum.photos/1800/700?random=5',
    },
    {
      id: 6,
      title: 'Blog Title 5',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quibusdam.',
      imageUrl: 'https://picsum.photos/1800/700?random=1',
    },
    {
      id: 7,
      title: 'Blog Title 6',
      content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quibusdam.',
      imageUrl: 'https://picsum.photos/1800/700?random=2',
    },
    {
      id: 7,
      title: 'Blog Title 7',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quibusdam.',
      imageUrl: 'https://picsum.photos/1800/700?random=3',
    },
    {
      id: 9,
      title: 'Blog Title 9',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quibusdam.',
      imageUrl: 'https://picsum.photos/1800/700?random=4',
    },
    {
      id: 10,
      title: 'Blog Title 10',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quibusdam.',
      imageUrl: 'https://picsum.photos/1800/700?random=5',
    }
    // Add more blog entries as needed
  ];

 useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  } 
  , [user, navigate]);

  return (
    <>
      <div className='container mx-auto my-4 px-10 rounded-lg '>
        <h1 className='text-5xl font-bold my-4'>Blogs</h1>
        <div className='flex-col '>
          <Card key={blogs[0].id} className='rounded-xl'>
            <CardBody className='p-4'>
              <img className='rounded-lg' src={blogs[0].imageUrl} alt={blogs.title} />
              <h2 className=" my-3 mb-2 text-2xl font-bold tracking-tight text-gray-900">{blogs[0].title}</h2>
              {/* <div className='w-full h-80  rounded-xl p-4 overflow-hidden '> */}
              <p className="w-full h-80  rounded-xl p-4 overflow-hidden ">{blogs[0].content}</p>
              {/* </div> */}
              <Link to={`/blog/${blogs.id}`} className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
            </CardBody>
          </Card>

        </div>

        {/* Add more blog entries as needed */}

        <div className="mt-5 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center overflow-hidden">
          {blogs.slice(1, 4).map((blog, index) => (
            <div key={index} className="max-w-sm p-4 border border-gray-200 rounded-lg shadow dark:border-gray-700" style={{ backgroundImage: `url(${blog.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              <div className='bg-opacity-50 backdrop-blur-none backdrop-filter w-full h-80 bg-gray-200 rounded-xl p-4 overflow-hidden'>
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{blog.title}</h5>
                </a>
                <p className="mb-3 font-normal text-black">{blog.content}</p>
              </div>
              <div className='flex justify-center'>
              </div>
              <Link to={`/blog/${blog._id}`} className="mt-5 mb-0 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

          {/* ************************************/}

      </div>
    </>
  );
}

export default Blogs;