export const saveAllergies = (allergies) => {
    localStorage.setItem('workerAllergies', JSON.stringify(allergies));
  };
  
  export const getAllergies = () => {
    const stored = localStorage.getItem('workerAllergies');
    return stored ? JSON.parse(stored) : [];
  };