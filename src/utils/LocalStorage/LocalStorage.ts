export const userKey = "user";

export const checkLocalStorage = (key: string): string | null =>
  localStorage.getItem(key);

export const persistLocalStorage = (key: string, value: string): void => {
  // generic type
  localStorage.setItem(key, value);
};

export const clearLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};