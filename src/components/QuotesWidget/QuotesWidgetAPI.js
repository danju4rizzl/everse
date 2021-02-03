import axios from 'axios';

export const getBible = async () => {
  const users = await axios.get(
    'https://beta.ourmanna.com/api/v1/get/?format=json',
    {
      headers: { 'Access-Control-Allow-Origin': '*' },
    }
  );
  console.log(users);
  // setUsers(users.data.results); // Changes the state
};
