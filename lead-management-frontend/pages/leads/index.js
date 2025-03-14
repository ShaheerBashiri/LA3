import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function LeadsList() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/leads');
      setLeads(response.data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };

  const deleteLead = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/leads/${id}`);
      fetchLeads(); // refresh the list
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  return (
    <div className="container">
      <h1>All Leads</h1>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/leads/create">Create New Lead</Link>
      </div>

      {leads.length === 0 ? (
        <p style={{ marginTop: '16px' }}>No leads yet.</p>
      ) : (
        <ul style={{ marginTop: '16px' }}>
          {leads.map((lead) => (
            <li key={lead.id}>
              <strong>{lead.name}</strong> ({lead.leadSource}) <br />
              <Link href={`/leads/${lead.id}`}>View / Edit</Link>
              <button onClick={() => deleteLead(lead.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}