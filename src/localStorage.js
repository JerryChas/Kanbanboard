export const fetchData = (STORAGE_KEY) => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveData = (dataToSave, STORAGE_KEY) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
};
