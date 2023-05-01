import React from "react";
import { Button } from '@mui/material'

function Records({ userData, selectedDate, onDelete }) {
    const selectedRecord = userData.records.find(
      (record) => record.date === selectedDate.toLocaleDateString()
    );
  
    const handleDelete = (workout) => {
      const userId = parseInt(localStorage.getItem("id"));
      const recordIndex = userData.records.findIndex(
        (record) => record.date === selectedDate.toLocaleDateString()
      );
      const updatedRecord = userData.records[recordIndex].record.filter((exercise) => exercise.workout !== workout);
      userData.records[recordIndex].record = updatedRecord;
      
      fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          records: userData.records
        })
      })
      .then((res) => res.json())
      .then((data) => {
        onDelete(selectedDate, workout);
      })
      .catch((error) => console.log(error));
    };
  
    return (
      <div>
        <ul>
          {selectedRecord.record.map((exercise) => (
            <li key={exercise.workout}>
                <span>{exercise.workout}</span>
                <Button 
                variant="text" 
                className="btn"
                onClick={() => handleDelete(exercise.workout)}>Delete</Button>
                <br />
                <span>{exercise.reps} X Reps</span>
                <br />
                <span>{exercise.sets} X Sets</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

export default Records;