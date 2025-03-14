import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function CustomersList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  return (
    <div className="container">
      <h1>All Customers</h1>
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/leads">Leads</Link>
      </div>

      {customers.length === 0 ? (
        <p style={{ marginTop: '16px' }}>No customers yet.</p>
      ) : (
        <ul style={{ marginTop: '16px' }}>
          {customers.map((cust) => (
            <li key={cust.id}>
              <strong>{cust.name}</strong> ({cust.leadSource}) <br />
              Sex: {cust.sex || ''}, Gender: {cust.gender || ''} <br />
              Address: {cust.address || ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}