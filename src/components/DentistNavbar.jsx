import React, { useState, useEffect } from 'react';
import {
  addPatient,
  getAllPatients,
  updatePatientDetails
} from '../Api'; // Adjust import path as needed
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// -------------------- Patient Detail Drawer --------------------
const PatientDetailDrawer = ({ open, onClose, patient }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    custom_id: '',
    name: '',
    dob: '',
    address: '',
    phone_no: '',
    email: '',
  });

  // Reset form data whenever "patient" changes
  useEffect(() => {
    if (patient) {
      setFormData({
        custom_id: patient.custom_id || '',
        name: patient.name || '',
        dob: patient.dob || '',
        address: patient.address || '',
        phone_no: patient.phone_no || '',
        email: patient.email || '',
      });
      setIsEditing(false);
    }
  }, [patient]);

  // For controlled inputs
  const handleFieldChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };
  // Save edits
  const handleSave = async () => {
    if (!patient?._id) return;
    try {
      await updatePatientDetails(patient._id, formData);
      setIsEditing(false);
      // Optionally refresh or show success
    } catch (err) {
      console.error('Error updating patient details:', err);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    if (patient) {
      setFormData({
        name: patient.name || '',
        dob: patient.dob || '',
        address: patient.address || '',
        phone_no: patient.phone_no || '',
        email: patient.email || '',
      });
    }
    setIsEditing(false);
  };

  // If the drawer is closed, render nothing
  if (!open) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex">
      {/* Clickable backdrop to close */}
      <div
        className="absolute inset-0 bg-transparent bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div
        className={`
          relative bg-white w-72 sm:w-110 max-w-full h-full shadow-md p-6
          transform transition-transform duration-300
        `}
        style={{ left: 0 }} // pinned to the left
      >
        <h2 className="text-xl font-bold mb-4">Patient Details</h2>
        {patient ? (
          isEditing ? (
            // -------------------- EDIT MODE --------------------
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Patient ID
                </label>
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  value={formData.custom_id}
                  onChange={handleFieldChange('custom_id')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  value={formData.name}
                  onChange={handleFieldChange('name')}
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">
                  DOB (YYYY-MM-DD)
                </label>
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  value={formData.dob}
                  onChange={handleFieldChange('dob')}
                />
              </div> */}
              <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Date of Birth (YYYY-MM-DD)
        </label>
        <div className="border border-gray-300 rounded px-2 py-1">
          <DatePicker
            selected={formData.dob}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"            // Format display in YYYY-MM-DD
            showYearDropdown                  // Enable year dropdown
            scrollableYearDropdown            // Allow scrolling in the year dropdown
            yearDropdownItemNumber={100}        // Display 100 years in the dropdown
            placeholderText="YYYY-MM-DD"        // Placeholder text for empty value
            maxDate={new Date()}              // Prevent selection of future dates
          />
        </div>
      </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  value={formData.address}
                  onChange={handleFieldChange('address')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  value={formData.phone_no}
                  onChange={handleFieldChange('phone_no')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  value={formData.email}
                  onChange={handleFieldChange('email')}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            // -------------------- VIEW MODE --------------------
            <div className="space-y-2">
              <p>
                <strong>Patient ID:</strong> {patient.custom_id}
              </p>
              <p>
                <strong>Name:</strong> {patient.name}
              </p>
              <p>
                <strong>DOB:</strong> {patient.dob}
              </p>
              <p>
                <strong>Address:</strong> {patient.address}
              </p>
              <p>
                <strong>Phone:</strong> {patient.phone_no}
              </p>
              <p>
                <strong>Email:</strong> {patient.email}
              </p>
              <div className="pt-4">
                <button
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </div>
            </div>
          )
        ) : (
          <p>No patient selected.</p>
        )}
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// -------------------- New Patient Drawer --------------------
const NewPatientDrawer = ({
  open,
  onClose,
  onAddPatient,
  name,
  newCoustom_id,
  dob,
  address,
  phone,
  email,
  setName,
  setDob,
  setNewCoustom_id,
  setAddress,
  setPhone,
  setEmail,
}) => {
  if (!open) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-transparent bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div
        className={`
          relative bg-white w-72 sm:w-110 max-w-full h-full shadow-md p-6
          transform transition-transform duration-300
        `}
        style={{ left: 0 }}
      >
        <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Patient ID
          </label>
          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            value={newCoustom_id}
            onChange={(e) => setNewCoustom_id(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth (YYYY-MM-DD)
          </label>
          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div> */}
         <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth (YYYY-MM-DD)
          </label>
          <div className="border border-gray-300 rounded px-2 py-1">
            <DatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              dateFormat="yyyy-MM-dd"            // Display format
              showYearDropdown                   // Enable year dropdown
              scrollableYearDropdown             // Make it scrollable
              yearDropdownItemNumber={100}         // Number of years to show
              placeholderText="YYYY-MM-DD"         // Placeholder text
              maxDate={new Date()}                // Prevent future dates
            />
          </div>
        </div>
       
       


        
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
            onClick={onAddPatient}
          >
            Save
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// -------------------- Main Navbar --------------------
const DentistNavbar = () => {
  // Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);

  // New patient drawer state
  const [isNewPatientDrawerOpen, setIsNewPatientDrawerOpen] = useState(false);

  // New patient form fields
  const [newName, setNewName] = useState('');
  const [newDob, setNewDob] = useState('');
  const [newCoustom_id, setNewCoustom_id] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // Searching patients
  const handleSearchChange = async (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (!val) {
      setSearchResults([]);
      return;
    }
    try {
      const patients = await getAllPatients(val);
      setSearchResults(patients);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleSearchSelect = (patient) => {
    setSelectedPatient(patient);
    setIsSearchDrawerOpen(true);
    setSearchTerm(patient.name);
    setSearchResults([]);
  };

  const handleSearchButtonClick = async () => {
    try {
      const patients = await getAllPatients(searchTerm);
      if (!patients.length) return;
      const exactMatch = patients.find(
        (p) => p.name.toLowerCase() === searchTerm.toLowerCase()
      );
      handleSearchSelect(exactMatch || patients[0]);
    } catch (err) {
      console.error('Error searching:', err);
    }
  };

  // Add new patient
  const handleAddPatient = async () => {
    try {
      const newPatient = {
        custom_id: newCoustom_id,
        name: newName,
        dob: newDob,
        address: newAddress,
        phone_no: newPhone,
        email: newEmail,
      };
      const created = await addPatient(newPatient);
      console.log('New patient added:', created);
      // Clear form and close
      setNewName('');
      setNewDob('');
      setNewCoustom_id('');
      setNewAddress('');
      setNewPhone('');
      setNewEmail('');
      setIsNewPatientDrawerOpen(false);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <>
      <nav className="bg-teal-600 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Kankariya Dental</h1>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                className="px-3 py-1 rounded focus:outline-none"
                type="text"
                placeholder="Search patient name..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded shadow-lg max-h-48 overflow-y-auto z-50">
                  {searchResults.map((p) => (
                    <div
                      key={p._id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSearchSelect(p)}
                    >
                      {p.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className="bg-white text-teal-600 px-3 py-1 rounded"
              onClick={handleSearchButtonClick}
            >
              Search
            </button>
            <button
              className="bg-white text-teal-600 px-3 py-1 rounded"
              onClick={() => setIsNewPatientDrawerOpen(true)}
            >
              New Patient
            </button>
          </div>
        </div>
      </nav>

      {/* Detail Drawer */}
      <PatientDetailDrawer
        open={isSearchDrawerOpen}
        onClose={() => setIsSearchDrawerOpen(false)}
        patient={selectedPatient}
      />
      {/* New Patient Drawer */}
      <NewPatientDrawer
        open={isNewPatientDrawerOpen}
        onClose={() => setIsNewPatientDrawerOpen(false)}
        onAddPatient={handleAddPatient}
        name={newName}
        dob={newDob}
        newCoustom_id={newCoustom_id}
        address={newAddress}
        phone={newPhone}
        email={newEmail}
        setNewCoustom_id={setNewCoustom_id}
        setName={setNewName}
        setDob={setNewDob}
        setAddress={setNewAddress}
        setPhone={setNewPhone}
        setEmail={setNewEmail}
      />
    </>
  );
};

export default DentistNavbar;
  