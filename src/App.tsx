import { useEffect, useState } from "react";
import axios from 'axios';


export const App = () => {

  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);



  const readData = async () => {
    setLoader(true);
    try {
      const data = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(data.data);
    }
    catch (error) {
      setError(true);
      console.log(error);

    }
    finally {
      console.log('terminó')
      setLoader(false);
    }
  };

  useEffect(() => {

    readData();
  }, []);

  return (
   <>
      <h1>APP COMPONENT</h1>
      <main>
      {loader && <p>Cargando espere un momento...</p>}
      {error && <p>Hubo un error, Lo sentimos...</p>}
      {users.map((user) => (
        <ul key={user.id}>
          <li>Nombre: {user.name}</li>
          <li>NickName: {user.username}</li>
          <li>Email: {user.email}</li>


        </ul>

      ))}

    </main>
   
   </> 

  )


};

