import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'

// headers: {
//     'x-rapidapi-host': 'bayut.p.rapidapi.com',
//     'x-rapidapi-key': '281de07376mshb5b3b0972ede173p1442e4jsn055d1870b36b'
//   }

export const fetchApi = async (url) => {
  const {data} = await axios.get((url), {
    headers: {
    'x-rapidapi-host': 'bayut.p.rapidapi.com',
    'x-rapidapi-key': '281de07376mshb5b3b0972ede173p1442e4jsn055d1870b36b'
  }})
    return data
}


