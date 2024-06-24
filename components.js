import React from 'react';

export const ServiceList = ({ services }) => {
  return (
    <div className="service-list">
      {services.map((service, index) => (
        <div key={index} className="service-item">
          <h3>{service.name}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export const ServiceDetail = ({ service }) => {
  return (
    <div className="service-detail">
      <h2>{service.name}</h2>
      <p>{service.description}</p>
      <p>Price: {service.price}</p>
    </div>
  );
};

export const TransactionCreationForm = ({ onTransactionSubmit }) => {
  const handleFormSubmission = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onTransactionSubmit(Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleFormSubmission} className="transaction-form">
      <label htmlFor="service">Service</label>
      <select id="service" name="service" required>
      </select>
      
      <label htmlFor="details">Transaction Details</label>
      <textarea id="details" name="details" required></textarea>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export const UserProfileSettingsForm = ({ userProfile, onSaveUserProfile }) => {
  const handleSettingsUpdate = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSaveUserProfile(Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleSettingsUpdate} className="user-settings-form">
      <label htmlFor="username">Username</label>
      <input id="username" name="username" defaultValue={userProfile.username} required />
      
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" defaultValue={userProfile.email} required />
      
      <button type="submit">Save Changes</button>
    </form>
  );
};