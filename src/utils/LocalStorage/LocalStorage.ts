export const userKey = "user";

export const getLocalStorage = (key: string): string => localStorage.getItem(key)!;

export const persistLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const clearLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};