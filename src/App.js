import React, { useEffect, useState } from 'react';
import './App.css'
const App = () => {
  const [users, setUsers] = useState([]);
  const [searchfirstName, setSearchfirstName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users?page=2');
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchfirstName(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchfirstName.toLowerCase())
  );

  return (
    <div className='App'>
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchfirstName}
        onChange={handleSearch}
      />
      {filteredUsers.map((user) => (
        <div key={user.id}>
          <div className='id-container'>
            <button className='user-id'>{user.id}</button>
            <div>
          <img src={user.avatar} alt={user.first_name} className='avatar' />
          </div>
          </div>
          <p>{user.first_name}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
