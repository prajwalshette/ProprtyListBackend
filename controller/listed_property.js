const Property = require("../models/Property");

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);

    // console.log("PROPERTY");
    // console.log(property);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

//update property by id
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    console.log("update Propert");
    console.log(req.body);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// Delete a property

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};



// Controller to get properties by email
exports.getPropertiesByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const properties = await Property.find({ propertyadder: email });

    if (properties.length === 0) {
      return res.status(404).json({ message: 'No properties found for this email.' });
    }

    res.json(properties);
  } catch (error) {
    console.error('Error retrieving properties:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};