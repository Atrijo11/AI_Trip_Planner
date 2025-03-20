// import React from 'react';

// function PlacesToVisit({ trip }) {
//   console.log("Itinerary Data:", trip?.tripData?.travelPlan?.itinerary);

//   const itineraryObj = trip?.tripData?.travelPlan?.itinerary || {};
  
//   // Convert object to array & sort based on day number
//   const itineraryArray = Object.entries(itineraryObj).sort(([dayA], [dayB]) => {
//     // Extract numbers from "day1", "day2", etc.
//     const numA = parseInt(dayA.replace("day", ""), 10);
//     const numB = parseInt(dayB.replace("day", ""), 10);
//     return numA - numB; // Sort in ascending order
//   });

//   return (
//     <div>
//       <h2 className="mt-10 mb-5 font-bold text-lg">Places to Visit</h2>

//       <div>
//         {itineraryArray.map(([day, details], index) => (
//           <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
//             <h3 className="font-semibold text-md">{day.toUpperCase()}</h3>
//             <p className="italic text-sm">Theme: {details.theme}</p>
//             <p className="text-sm">Best Time to Visit: {details.bestTimeToVisit}</p>

//             <ul className="list-disc ml-4">
//               {details.places?.map((place, idx) => (
//                 <li key={idx} className="mb-2">
//                   <h4 className="font-bold">{place.placeName}</h4>
//                   <p>{place.placeDetails}</p>
//                   {/* <img src={place.placeImageUri} alt={place.placeName} className="w-40 h-30 rounded-lg" /> */}
//                   <img src='/Tourist.jpeg' alt={place.placeName} className="w-40 h-30 rounded-lg" />
//                   <p>Ticket Price: {place.ticketPricing}</p>
//                   <p>Travel Time: {place.travelTime}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PlacesToVisit;

import React from 'react';

function PlacesToVisit({ trip }) {
  console.log("Itinerary Data:", trip?.tripData?.travelPlan?.itinerary);

  const itineraryObj = trip?.tripData?.travelPlan?.itinerary || {};
  
  // Convert object to array & sort based on day number
  const itineraryArray = Object.entries(itineraryObj).sort(([dayA], [dayB]) => {
    const numA = parseInt(dayA.replace("day", ""), 10);
    const numB = parseInt(dayB.replace("day", ""), 10);
    return numA - numB;
  });

  return (
    <div>
      <h2 className="mt-10 mb-5 font-bold text-lg">Places to Visit</h2>

      <div>
        {itineraryArray.map(([day, details], index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
            <h3 className="font-bold text-xl">📌 {day.toUpperCase()}</h3>
            <p className="italic text-sm">Theme : {details.theme}</p>
            <p className="text-sm">Best Time to Visit : {details.bestTimeToVisit}</p>

            {details.places?.map((place, idx) => (
              <div key={idx} className="flex justify-between items-start gap-4 p-4 border-b border-gray-200">
                {/* Left Side - Text Content */}
                <div className="w-2/3">
                  <h4 className="font-bold text-lg"> {place.placeName}</h4>
                  <p className="text-sm text-gray mt-2 text-gray-500">{place.placeDetails}</p>
                  <p className="text-sm mt-3">🎟 <span className='font-bold'>Ticket Price: </span>{place.ticketPricing}</p>
                  <p className="text-sm">🕒 <span className='font-bold'> Travel Time: </span> {place.travelTime}</p>
                </div>

                {/* Right Side - Image */}
                <div className="w-1/3">
                  <img src='/Tourist.jpeg' alt={place.placeName} className="w-full h-32 object-cover rounded-lg shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
