import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { IoMdAdd } from "react-icons/io";
import style from "./Diary.module.css";
import axios from 'axios';
import { API } from "../../Utils/API";
import { classifyTask, createModel, loadModel, run, trainModel } from '../../Model/ModelTraining-4';

export default function DiaryComponent() {
  const token = localStorage.getItem('token');
  const [todos, setTodos] = useState([]);
  const refTask = useRef(null);
  const [model, setModel] = useState(null);  // State for the model
  
  // Fetch diary data and organize by date
  const fetchDiary = async () => {
    try {
      const response = await axios.get(`${API}/api/diary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const task = response.data;
      const organisedTask = [];

      task.forEach((t) => {
        const taskDate = format(new Date(t.createdAt), 'yyyy-MM-dd');

        // Find existing group for this date or create a new one
        const existingGroup = organisedTask.find(group => group.date === taskDate);
        if (existingGroup) {
          existingGroup.taskArray.push({
            _id: t._id,
            task: t.task,
            type: t.type
          });
        } else {
          organisedTask.push({
            date: taskDate,
            taskArray: [{
              _id: t._id,
              task: t.task,
              type: t.type
            }]
          });
        }
      });
      
      setTodos(organisedTask);
    } catch (err) {
      console.error('Error fetching diary data:', err);
    }
  };

  // Add a new diary entry
  const addDiary = async (e) => {
    e.preventDefault();
    try {
      const text = refTask.current.value;
  
      if (model) {  // Ensure model is initialized
        const type = await classifyTask(model, text);  // Use the trained model
        await axios.post(
          `${API}/api/diary`,
          { task: text, type: type },
          { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
        );
        
      } else {
        console.error("Model is not initialized.");
      }
  
      fetchDiary();  // Optionally refetch diary data or update state locally after adding a new task
    } catch (err) {
      console.error('Error adding diary entry:', err);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(`${API}/api/diary/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      fetchDiary();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  // Alter a task's type and retrain the model
  const handleAlter = async (id) => {
    try {
      // Update the diary entry with the new type
      const response = await axios.patch(`${API}/api/diary/${id}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      const updatedTask = response.data;  // Assuming this contains the updated task info
      const newDataset = [{ text: updatedTask.task, label: updatedTask.type }];

      // Retrain the model with the corrected task data
      await trainModel(model, newDataset);
  
      fetchDiary();
    } catch (err) {
      console.error('Error updating task or retraining the model:', err);
    }
  };

  // Initialize the model and train it with existing diary tasks
  useEffect(() => {
    const initializeModel = async () => {
      try {
        await loadModel();  // Load the USE model
  
        const neuralModel = createModel();  // Create the neural network model
  
        // Fetch existing data to train the model
        const response = await axios.get(`${API}/api/diary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const dataset = response.data.map(item => ({
          text: item.task,
          label: item.type,
        }));
  
        await trainModel(neuralModel, dataset);  // Train the model with the dataset
        run();
        setModel(neuralModel);  // Set the trained model in state
      } catch (error) {
        console.error("Error initializing model:", error);
      }
    };
  
    initializeModel();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <form onSubmit={addDiary} className="flex space-x-2 mb-4 flex-wrap gap-y-3 items-center justify-center">
        <div className="relative w-auto">
          <input
            required
            type="text"
            placeholder="Daily✍️"
            className="p-4 outline-none bg-transparent max-w-[400px] w-full rounded-md text-black border border-gray-300 text-base"
            ref={refTask}
          />
          <span className="absolute rounded-xl left-0 text-xs transform translate-x-3 -translate-y-2 px-1 bg-gray-900 border border-gray-300 text-gray-300">
            Write Here:
          </span>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800"
        >
          <IoMdAdd />
        </button>
      </form>

      <div>
        {todos.map(({ date, taskArray }) => (
          <ul key={date} className={style.page}>
            <h2 className="text-lg font-semibold mb-2">
              {format(new Date(date), 'MMMM d, yyyy')}
            </h2>
            {taskArray.map((todo, index) => (
              <li key={todo._id} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md shadow-sm">
                <div className={style.margin}></div>
                <span className="font-medium">{index + 1}.</span>
                <span className="flex-grow">{todo.task}</span>
                <button onClick={() => handleAlter(todo._id)} className="px-2 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
                  {todo.type}
                </button>
                <button onClick={() => handleDeleteTask(todo._id)} className="px-2 py-1 bg-red-300 text-gray-800 rounded-md hover:bg-gray-400">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
