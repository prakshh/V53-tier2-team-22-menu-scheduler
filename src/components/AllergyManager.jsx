import { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { saveAllergies, getAllergies } from '../utils/storage';

export const AllergyManager = () => {
  const [allergies, setAllergies] = useState(getAllergies());
  const [newAllergen, setNewAllergen] = useState('');

  const handleAddAllergy = () => {
    if (!newAllergen.trim()) return;
    
    const newAllergy = {
      id: Date.now().toString(),
      allergen: newAllergen.trim()
    };
    
    const updatedAllergies = [...allergies, newAllergy];
    setAllergies(updatedAllergies);
    saveAllergies(updatedAllergies);
    setNewAllergen('');
  };

  const handleRemoveAllergy = (id) => {
    const updatedAllergies = allergies.filter(allergy => allergy.id !== id);
    setAllergies(updatedAllergies);
    saveAllergies(updatedAllergies);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Allergies</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newAllergen}
          onChange={(e) => setNewAllergen(e.target.value)}
          placeholder="Enter allergen..."
          className="flex-1 p-2 border rounded-md"
        />
        <button
          onClick={handleAddAllergy}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Add
        </button>
      </div>

      <div className="space-y-2">
        {allergies.map((allergy) => (
          <div
            key={allergy.id}
            className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
          >
            <span>{allergy.allergen}</span>
            <button
              onClick={() => handleRemoveAllergy(allergy.id)}
              className="text-red-500 hover:text-red-600"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};