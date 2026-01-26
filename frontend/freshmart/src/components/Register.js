import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/auth/register', { name, email, password });
    alert('Registered');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="block w-full mb-2 p-2 border" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full mb-2 p-2 border" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full mb-2 p-2 border" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}

export default Register;