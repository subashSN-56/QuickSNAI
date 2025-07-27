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
        headers: { Authorization: `Bearer ${await getToken()}` },
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
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // On mount
  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  // Loading spinner
  if (loading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <span className='w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin'></span>
      </div>
    );
  }

  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      <h2 className='text-xl font-semibold'>Creations</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
        {creations.map((creation) => (
          <div key={creation.id} className='relative group w-full'>
            {/* Image wrapper */}
            <div className='aspect-[4/3] w-full overflow-hidden rounded-lg'>
              <img
                src={creation.content}
                alt={creation.prompt || 'User creation'}
                className='w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105'
              />
            </div>

            {/* Hover Overlay */}
            <div className='absolute inset-0 flex flex-col justify-between p-3 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg text-white'>
              <p className='text-sm'>{creation.prompt}</p>
              <div className='flex justify-end items-center gap-1'>
                <p>{creation.likes.length}</p>
                <Heart
                  onClick={() => imageLikeToggle(creation.id)}
                  className={`w-5 h-5 hover:scale-110 cursor-pointer transition-all ${
                    creation.likes.includes(user?.id)
                      ? 'fill-red-500 text-red-600'
                      : 'text-white'
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
