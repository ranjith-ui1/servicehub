const API_URL = "https://dummyjson.com/users";

// Get all service providers
export const getServices = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch service providers");
  }

  const data = await response.json();

  return data.users;
};

// Get single service provider by ID
export const getServiceById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Service provider not found");
  }

  const data = await response.json();

  return data;
};