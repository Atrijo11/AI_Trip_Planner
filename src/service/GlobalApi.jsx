import axios from "axios"

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'

const config = {
    headers:{
        'Context-Type' : 'application/json',
    'X-Goog-Api-Key' : import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    'X-Goog-FieldMask' : [
        'places.photos',
        'places.displayName',
        'places.id'
    ]
    }
}

export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config)