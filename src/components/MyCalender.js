import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Records from './Records';

function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exerciseRecord, setExerciseRecord] = useState({
    workout: "",
    reps: 0,
    sets: 0,
  });
  const [userData, setUserData] = useState(null);

  const userId = localStorage.getItem("id")

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      const data = await response.json();
      setUserData(data);
    };
    fetchData();
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedDate && exerciseRecord) {
      const newRecord = { date: selectedDate.toLocaleDateString(), record: exerciseRecord };

      if (userData) {
        let updatedRecords = [];

        if (userData.records) {
          const dateIndex = userData.records.findIndex((item) => item.date === newRecord.date);

          if (dateIndex === -1) {
            // if there is no record for selected date, create a new one
            updatedRecords = [...userData.records, { date: newRecord.date, record: [newRecord.record] }];
          } else {
            // if there is already a record for selected date, add a new record
            updatedRecords = [...userData.records];
            const dateRecord = updatedRecords[dateIndex];
            const updatedDateRecord = {
              ...dateRecord,
              record: [...dateRecord.record, newRecord.record]
            };
            updatedRecords[dateIndex] = updatedDateRecord;
          }
        } else {
          // if userData does not have records, create a new record
          updatedRecords = [{ date: newRecord.date, record: [newRecord.record] }];
        }

        const newData = { ...userData, records: updatedRecords };
        setUserData(newData);
        saveDataToServer(newData);
        console.log(`Exercise record saved for ${userId}`);
      }
    }
  };

  const saveDataToServer = (data) => {
    fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const deleteExercise = (selectedDate, workout) => {
    setUserData(prevData => {
      const newData = { ...prevData };
      const record = newData.records.find(record => record.date === selectedDate.toLocaleDateString());
      record.record = record.record.filter(exercise => exercise.workout !== workout);
      return newData;
    });
  }

  return (
    <div>
      <h3>Select a date</h3>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        showYearDropdown={true}
        showMonthDropdown={true}
        dropdownMode="select"
        inline
      />
      <div>
        Selected date: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
        <br />
        <form onSubmit={handleSubmit}>
          <div >
            <label>Workout:</label>
            <input type="text" value={exerciseRecord.workout} onChange={(e) => setExerciseRecord({...exerciseRecord, workout: e.target.value})} />
          </div>
          <div>
            <label>Reps:</label>
            <input type="number" value={exerciseRecord.reps} onChange={(e) => setExerciseRecord({...exerciseRecord, reps: e.target.value})} />
          </div>
          <div>
            <label>Sets:</label>
            <input type="number" value={exerciseRecord.sets} onChange={(e) => setExerciseRecord({...exerciseRecord, sets: e.target.value})} />
          </div>
          <button>Save</button>
        </form>
      </div>
      {userData?.records?.some(record => record.date === selectedDate.toLocaleDateString()) 
        ? <Records userData={userData} selectedDate={selectedDate} onDelete={deleteExercise}/>
        : <p>No records found.</p>
      }
    </div>
  );
}

export default MyCalendar;