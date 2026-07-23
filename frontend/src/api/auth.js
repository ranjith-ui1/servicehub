// Small helper so every page reads/writes the logged-in user the same way,
// instead of each page re-parsing localStorage on its own.

const STORAGE_KEY = "currentUser";

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
};

export const setCurrentUser = (user) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isLoggedIn = () => Boolean(getCurrentUser());
