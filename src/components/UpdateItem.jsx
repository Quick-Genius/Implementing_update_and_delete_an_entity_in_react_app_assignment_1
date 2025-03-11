import React, { useState, useEffect } from "react";

const UpdateItem = () => {
    // 1. Create a state for the form
    // 2. Create a function to handle the form submission
    // 3. Create a function to handle the form input changes
    
    // your code here
  const [item, setItem] = useState(null);
  const [updatedValue, setUpdatedValue] = useState("");
  const [message, setMessage] = useState("");

  const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/1`; // Fetch a specific door

  // Fetch existing item
  useEffect(() => {
    fetch(API_URI)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
        setUpdatedValue(data.name); // Assuming 'name' is an editable field
      })
      .catch((error) => console.error("Error fetching item:", error));
  }, []);

  // Handle input change
  const handleChange = (event) => {
    setUpdatedValue(event.target.value);
  };

  // Handle update request
  const handleUpdate = () => {
    fetch(API_URI, {
      method: "PUT", // Use PATCH if updating specific fields
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage("Item updated successfully!");
        setItem(data);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        setMessage("Failed to update item.");
      });
  };

  return (
    <div>
      <h2>Update Item</h2>
      {item ? (
        <div>
          <p>Current Item: {item.name}</p>
          <input type="text" value={updatedValue} onChange={handleChange} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <p>Loading item...</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateItem;

