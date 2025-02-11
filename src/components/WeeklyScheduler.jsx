import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, RefreshCw, Download } from 'lucide-react';
import { startOfWeek, addDays, format } from 'date-fns';
import { fetchDishes } from '../utils/api';
import { getAllergies } from '../utils/storage';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

export const WeeklyScheduler = () => {
  const [startDate, setStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [schedule, setSchedule] = useState({ startDate, schedule: [] });
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDishes();
  }, []);

  const loadDishes = async () => {
    try {
      const fetchedDishes = await fetchDishes();
      setDishes(fetchedDishes);
      generateSchedule(fetchedDishes);
    } catch (err) {
      setError('Failed to load dishes');
    } finally {
      setLoading(false);
    }
  };

  const generateSchedule = (availableDishes) => {
    const allergies = getAllergies();
    const filteredDishes = availableDishes.filter(dish => 
      !allergies.some(allergy => 
        // dish.name.toLowerCase().includes(allergy.allergen.toLowerCase()) || // Check dish name
        dish.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(allergy.allergen.toLowerCase()) // Check ingredients
        )
      )
    );

    const shuffled = [...filteredDishes].sort(() => Math.random() - 0.5);
    const weekSchedule = Array(7).fill(null).map((_, index) => ({
      date: addDays(startDate, index),
      dish: shuffled[index] || null,
      isDayOff: false
    }));

    setSchedule({ startDate, schedule: weekSchedule });
  };

  const toggleDayOff = (index) => {
    const newSchedule = [...schedule.schedule];
    newSchedule[index] = {
      ...newSchedule[index],
      isDayOff: !newSchedule[index].isDayOff
    };
    setSchedule({ ...schedule, schedule: newSchedule });
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Weekly Menu Schedule', 20, 20);
    
    schedule.schedule.forEach((day, index) => {
        const yPos = 40 + (index * 10);
        const dateStr = format(day.date, 'EEEE, MMM d');
        const menuText = day.isDayOff ? 'Day Off' : day.dish?.name || 'No dish assigned';
        doc.text(`${dateStr}: ${menuText}`, 20, yPos);
    });
    
    doc.save('weekly-menu.pdf');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
        schedule.schedule.map(day => ({
        Date: format(day.date, 'EEEE, MMM d'),
        Dish: day.isDayOff ? 'Day Off' : day.dish?.name || 'No dish assigned',
        Calories: day.isDayOff ? '-' : day.dish?.calories || '-'
        }))
    );
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Menu Schedule');
    XLSX.writeFile(wb, 'weekly-menu.xlsx');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
            className="p-2 border rounded-md"
          />
          <button
            onClick={() => generateSchedule(dishes)}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 flex items-center gap-2"
          >
            <RefreshCw size={20} />
            Regenerate
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportToPDF}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
          >
            <Download size={20} />
            PDF
          </button>
          <button
            onClick={exportToExcel}
            className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 flex items-center gap-2"
          >
            <Download size={20} />
            Excel
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {schedule.schedule.map((day, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              day.isDayOff ? 'bg-gray-100' : 'bg-blue-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span className="font-semibold">
                  {format(day.date, 'EEEE, MMMM d')}
                </span>
              </div>
              <button
                onClick={() => toggleDayOff(index)}
                className={`px-3 py-1 rounded-md ${
                  day.isDayOff
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}
              >
                {day.isDayOff ? 'Enable Day' : 'Mark as Day Off'}
              </button>
            </div>
            {!day.isDayOff && day.dish && (
              <div className="mt-2">
                <p className="font-medium">{day.dish.name}</p>
                <p className="text-sm text-gray-600">
                  Calories: {day.dish.calories}
                </p>
                <p className="text-sm text-gray-600">
                  Ingredients: {day.dish.ingredients.join(', ')}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};