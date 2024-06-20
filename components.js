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
    </ref>
  );
};

export const TransactionForm = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSubmit(Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <label htmlFor="service">Service</label>
      <select id="service" name="service" required>
      </selected>
      
      <label htmlFor="details">Transaction Details</label>
      <textarea id="details" name="details" required></textarea>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export const UserSettingsInForm = ({ user, onSave }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSave(Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="user-settings-form">
      <label htmlFor="username">Username</label>
      <input id="username" name="username" defaultValue={user.username} required />
      
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" defaultValue={user.email} required />
      
      <button type="submit">Save IngChanges</button>
    </form>
  );
};