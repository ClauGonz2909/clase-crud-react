import { useEffect, useState } from "react";
import axios from 'axios';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const readData = async () => {
    setLoader(true);
    setError(false);
    try {
      const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      setError(true);
      console.error('Error fetching data:', error);
    } finally {
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
        {loader && <p>Cargando, espere un momento...</p>}
        {error && <p>Hubo un error, lo sentimos...</p>}
        {!loader && !error && users.map((user) => (
          <ul key={user.id}>
            <li>Nombre: {user.name}</li>
            <li>NickName: {user.username}</li>
            <li>Email: {user.email}</li>
          </ul>
        ))}
      </main>
    </>
  );
};
