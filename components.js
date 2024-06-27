import React from 'react';

const ServiceItem = ({ service }) => (
  <div className="service-item">
    <h3>{service.name}</h3>
    <p>{service.description}</p>
  </div>
);

export const ServiceList = ({ services }) => {
  return (
    <div className="service-list">
      {services.map((service, index) => (
        <ServiceItem key={index} service={service} />
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

const handleFormSubmission = (onTransactionSubmit) => (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  onTransactionSubmit(Object.fromEntries(formData));
};

export const TransactionCreationForm = ({ onTransactionSubmit }) => {
  return (
    <form onSubmit={handleFormSubmission(onTransactionSubmit)} className="transaction-form">
      <label htmlFor="service">Service</label>
      <select id="service" name="service" required></select>

      <label htmlFor="details">Transaction Details</label>
      <textarea id="details" name="details" required></textarea>

      <button type="submit">Submit</button>
    </form>
  );
};

const handleSettingsUpdate = (onSaveUserProfile) => (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  onSaveUserProfile(Object.fromEntries(formData));
};

export const UserProfileSettingsForm = ({ userProfile, onSaveUserProfile }) => {
  return (
    <form onSubmit={handleSettingsUpdate(onSaveUserProfile)} className="user-settings-form">
      <label htmlFor="username">Username</label>
      <input id="username" name="username" defaultValue={userProfile.username} required />

      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" defaultValue={userProfile.email} required />

      <button type="submit">Save Changes</button>
    </form>
  );
};