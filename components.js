import React from 'react';

export const ServicesList = ({ services }) => {
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

export const ServiceDetails = ({ service }) => {
  return (
    <div className="service-detail">
      <h2>{service.name}</h2>
      <p>{service.description}</p>
      <p>Price: {service.price}</p>
    </div>
  );
};

export const TransactionForm = ({ onSubmitTransaction }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSubmitTransaction(Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleFormSubmit} className="transaction-form">
      <label htmlFor="service">Service</label>
      <select id="service" name="service" required>
      </select>
      
      <label htmlFor="details">Transaction Details</label>
      <textarea id="details" name="details" required></textarea>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export const UserSettingsForm = ({ userData, onSaveUserSettings }) => {
  const handleSettingsSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSaveUserSettings(Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleSettingsSubmit} className="user-settings-form">
      <label htmlFor="username">Username</label>
      <input id="username" name="username" defaultValue={userData.username} required />
      
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" defaultValue={userData.email} required />
      
      <button type="submit">Save Changes</button>
    </form>
  );
};