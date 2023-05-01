import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Records from './Records';
import { Button, TextField , Grid } from '@mui/material'

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
    <Grid container spacing={4}>
      <Grid item xs={4} md={4}>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          showYearDropdown={true}
          showMonthDropdown={true}
          dropdownMode="select"
          inline
          className='calendar'
        />
      </Grid>
      <Grid item xs={4} md={4}>
        <div>
          <p>{selectedDate ? selectedDate.toLocaleDateString() : 'None'}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Workout" 
                value={exerciseRecord.workout} 
                onChange={(e) => setExerciseRecord({...exerciseRecord, workout: e.target.value})} 
                fullWidth
                InputLabelProps={{style: { color: 'white' },}}
                inputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <TextField 
                type="number"
                label="Reps"
                value={exerciseRecord.reps} 
                onChange={(e) => setExerciseRecord({...exerciseRecord, reps: e.target.value})} 
                fullWidth
                InputLabelProps={{style: { color: 'white' },}}
                inputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <TextField 
                type="number"
                label="Sets"
                value={exerciseRecord.sets} 
                onChange={(e) => setExerciseRecord({...exerciseRecord, sets: e.target.value})} 
                fullWidth
                InputLabelProps={{style: { color: 'white' },}}
                inputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <Button type="submit" variant="contained" className='button' fullWidth>Save</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={4} md={4}>
        {userData?.records?.some(record => record.date === selectedDate.toLocaleDateString()) 
          ? <Records userData={userData} selectedDate={selectedDate} onDelete={deleteExercise}/>
          : null
        }
      </Grid>
    </Grid>
  );
}

export default MyCalendar;