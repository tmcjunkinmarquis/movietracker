import { apiKey } from '../apiKey';

export const fetchSomeMovies = async ()=>{
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=primary_release_date.asc&include_adult=false&include_video=false&page=1&primary_release_year=2018`;
  
  const response = await fetch(url);
  const moviesData = await response.json();
  return moviesData; 
};

// export const postNewUserToDatabase = async (user) => {
//   const url = 'http://localhost:3000/api/users/new';
//   const options = {
//     method: 'POST'
//     body: JSON.stringify(user)
//     headers:
//   }
//   const response = await fetch(url, options);
//   const userData = await response.json();
//   return userData.data;
// };

export const loginUser = async (user) => {
  try {
    const url = 'http://localhost:3000/api/users/';
    const options = {
      method: 'POST',
      body: JSON.stringify({email: user.email, password: user.password}),
        headers: {'Content-Type': 'application/json'}
    };
    const response = await fetch(url, options);
    if(response.status===200){

      const userData = await response.json();
      return userData;
    } else if (response.status > 400){
      const failedUserData = await response.json();

      console.log('over 400', failedUserData);
    }
    
    

  } catch (error) {
    
    throw Error(alert('Name and Password do not match.'));
  }
};