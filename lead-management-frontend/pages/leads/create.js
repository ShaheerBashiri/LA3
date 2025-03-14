import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CreateLead() {
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [leadSource, setLeadSource] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/leads', {
        name,
        sex,
        gender,
        address,
        leadSource,
      });
      // Go back to leads list
      router.push('/leads');
    } catch (error) {
      console.error('Error creating lead:', error);
    }
  };

  return (
    <div className="container">
      <h1>Create a New Lead</h1>
      <div className="nav-links">
        <Link href="/leads">Back to Leads List</Link>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
        <label>Name:</label>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        <label>Sex:</label>
        <input 
          value={sex} 
          onChange={(e) => setSex(e.target.value)} 
        />

        <label>Gender:</label>
        <input 
          value={gender} 
          onChange={(e) => setGender(e.target.value)} 
        />

        <label>Address:</label>
        <input 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
        />

        <label>Lead Source:</label>
        <input 
          value={leadSource} 
          onChange={(e) => setLeadSource(e.target.value)} 
        />

        <button type="submit">Create Lead</button>
      </form>
    </div>
  );
}