// import { useAuth, useUser } from '@clerk/clerk-react'
// import React, { useEffect, useState } from 'react'
// import { Heart } from 'lucide-react'
// import axios from 'axios'
// import toast from 'react-hot-toast'

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
// const Community = () => {


//   const [creations, setCreations] = useState([])
//   const { user } = useUser()
//   const [loading, setLoading] = useState(true)

//   const { getToken } = useAuth()

//   const fetchCreations = async () => {
//     try {
//       const { data } = await axios.get('/api/user/get-Published-creations', {
//         headers: { Authorization: `Bearer ${await getToken()}` }
//       })
//       if (data.success) {
//         setCreations(data.creations)
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//     setLoading(false)
//   }


//   useEffect(() => {
//     if (user) {
//       fetchCreations()
//     }
//   }, [user])
//   return (
//     <div className='flex-1 h-full flex flex-col gap-4 p-6'>
//       Creations
//       <div className='bg-white h-full w-full rounded-xl overflow-y-scroll'>
//         {creations.map((creation, index) => (
//           <div key={index} className="relative group inline-block pl-3 pt-3 w-full sm:w-1/2 lg:w-1/3">
//             <img src={creation.content} alt="" className="w-full h-full object-cover rounded-lg" />
//             <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
//               <p className="text-sm hidden group-hover:block">{creation.prompt}</p>
//               <div className="flex gap-1 items-center">
//                 <p>{creation.likes.length}</p>
//                 <Heart className={`min-w-5 h-5 hover:scale-110 cursor-pointer 
//           ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-600' : 'text-white'}`} />
//               </div>
//             </div>
//           </div>
//         ))}


//       </div>

//     </div>
//   )
// }

// export default Community

import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { getToken } = useAuth();

  // Fetch published creations
  const fetchCreations = async () => {
    try {
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // Toggle like/unlike
  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        '/api/user/toggle-like-creations',
        { id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        }
      );

      if (data.success) {
        // Update likes in UI
        toast.success(data.message);
        await fetchCreations();
      
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchCreations();
  }, [user]);

  if (loading) return <p className="p-6">Loading...</p>;

  return !loading ?(
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      <h2 className="text-xl font-bold">Creations</h2>
      <div className='bg-white h-full w-full rounded-xl overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {creations.map((creation) => (
          <div
            key={creation.id}
            className="relative group w-full h-64 rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={creation.content}
              alt={creation.prompt}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end text-white">
              <p className="text-sm mb-2">{creation.prompt}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm">{creation.likes.length}</p>
                <Heart
                  className={`w-5 h-5 cursor-pointer transition-transform hover:scale-110 
                    ${creation.likes.includes(user.id)
                      ? 'fill-red-500 text-red-600'
                      : 'text-white'
                    }`}
                  onClick={() => imageLikeToggle(creation.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : 
  (
    <div className='flex items-center justify-center h-full'>
      <span className='w-10 h-10 my-1 rounded-full border-2 border-primary  border-t-transparent animate-spin'></span>
      
    </div>
  )
};

export default Community;
