require('dotenv').config(); // loads .env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// ============== Mongoose Connection ==============
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lead_management';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected:', uri);
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// ============== Models ==============
const leadSchema = new mongoose.Schema({
  name: String,
  sex: String,
  gender: String,
  address: String,
  leadSource: String,
});
const Lead = mongoose.model('Lead', leadSchema);

const customerSchema = new mongoose.Schema({
  name: String,
  sex: String,
  gender: String,
  address: String,
  leadSource: String,
});
const Customer = mongoose.model('Customer', customerSchema);

// ============== Middleware ==============
app.use(cors());
app.use(express.json());

// ============== Routes ==============

// GET all leads
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    console.error('Error getting leads:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create a new lead
app.post('/api/leads', async (req, res) => {
  try {
    const { name, sex, gender, address, leadSource } = req.body;
    const newLead = new Lead({ name, sex, gender, address, leadSource });
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a single lead by ID
app.get('/api/leads/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT (update) a lead by ID
app.put('/api/leads/:id', async (req, res) => {
  try {
    const { name, sex, gender, address, leadSource } = req.body;
    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      { name, sex, gender, address, leadSource },
      { new: true } // return updated doc
    );
    if (!updated) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a lead by ID
app.delete('/api/leads/:id', async (req, res) => {
  try {
    const removed = await Lead.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(removed);
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST: Convert a lead to customer
app.post('/api/leads/:id/convert', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // create a new customer with the lead info
    const newCustomer = new Customer({
      name: lead.name,
      sex: lead.sex,
      gender: lead.gender,
      address: lead.address,
      leadSource: lead.leadSource,
    });
    await newCustomer.save();

    // remove the lead
    await lead.delete();

    res.json({ message: 'Lead converted to customer', customer: newCustomer });
  } catch (error) {
    console.error('Error converting lead:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all customers
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============== Start Server ==============
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});