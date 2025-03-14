
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LeadDetail() {
  const router = useRouter();
  const { id } = router.query;

  // State variables for each lead field:
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [leadSource, setLeadSource] = useState('');
  const [loading, setLoading] = useState(true);

  // On component mount (or whenever `id` changes), fetch the lead's data:
  useEffect(() => {
    if (id) {
      fetchLead(id);
    }
  }, [id]);

  const fetchLead = async (leadId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/leads/${leadId}`);
      const lead = response.data;

      // Populate form fields with existing lead data:
      setName(lead.name || '');
      setSex(lead.sex || '');
      setGender(lead.gender || '');
      setAddress(lead.address || '');
      setLeadSource(lead.leadSource || '');

      setLoading(false);
    } catch (error) {
      console.error('Error fetching lead:', error);
    }
  };

  // PUT request to update the lead, then redirect back to leads list
  const updateLead = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/leads/${id}`, {
        name,
        sex,
        gender,
        address,
        leadSource,
      });
      alert('Lead updated successfully!');
      // After success, go back to the main leads list:
      router.push('/leads');
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  // POST request to convert lead to customer, then go to /customers
  const convertLead = async () => {
    try {
      await axios.post(`http://localhost:4000/api/leads/${id}/convert`);
      alert('Lead converted to customer!');
      router.push('/customers');
    } catch (error) {
      console.error('Error converting lead:', error);
    }
  };

  if (loading) {
    return <div className="container">Loading lead details...</div>;
  }

  return (
    <div className="container">
      <h1>Edit Lead</h1>

      <form onSubmit={updateLead} style={{ marginTop: '16px' }}>
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

        <button type="submit" style={{ marginTop: '12px' }}>
          Update Lead
        </button>
      </form>

      <button onClick={convertLead} style={{ marginTop: '16px' }}>
        Convert to Customer
      </button>
    </div>
  );
}