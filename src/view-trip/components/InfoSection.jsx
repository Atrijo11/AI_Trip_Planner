import { GetPlaceDetails } from '@/service/GlobalApi'
import React, { useEffect } from 'react'

function InfoSection({trip}) {
  const GetPlacePhoto=async()=>{
    useEffect(()=>{
      trip&&GetPlacePhoto();
    },[trip])
    const data={
      textQuery:trip?.userSelection?.location?.place_name
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data)
    })
  }
  return (
    <div>
        <img src='/placeholder.jpeg' className='h-[400px] w-full object-cover rounded-xl'></img>
        <div>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.place_name}</h2>
            <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-blue-100 rounded-full text-blue-700'>📅 {trip.userSelection?.noOfDays} Days</h2>
                <h2 className='p-1 px-3 bg-blue-100 rounded-full text-blue-700'>💰 {trip.userSelection?.budget} Budget</h2>
                <h2 className='p-1 px-3 bg-blue-100 rounded-full text-blue-700'> 👪 People Travelling: {trip.userSelection?.traveler}</h2>
            </div>
        </div>
        </div>
    </div>
  )
}

export default InfoSection