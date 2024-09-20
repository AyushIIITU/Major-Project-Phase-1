import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { IoMdAdd } from "react-icons/io";
import style from "./Diary.module.css";
import axios from 'axios';
import { API } from "../../Utils/API";

export default function DiaryComponent() {
  const token = localStorage.getItem('token');
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const refTask = useRef(null); // Correct ref for task input

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

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
      console.log(organisedTask);
      

      setTodos(organisedTask);
    } catch (err) {
      console.error('Error fetching diary data:', err);
    }
  };

  const addDiary = async (e) => {
    e.preventDefault();
    try {
      const text = refTask.current.value;

      const response = await axios.post(
        `${API}/api/diary`,
        {
          task: text,
          type: "productive", // Assuming the type field
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optionally refetch diary data or update state locally after adding a new task
      fetchDiary();

    } catch (err) {
      console.error('Error adding diary entry:', err);
    }
  };

  useEffect(() => {
    fetchDiary();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <form onSubmit={addDiary} className="flex space-x-2 mb-4 flex-wrap gap-y-3 items-center justify-center">
        {/* <div className="flex flex-col items-center">
          <label htmlFor="date">
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            id="date"
            aria-label="Select date"
          />
        </div> */}

        <div className="relative w-auto">
          <input
            required
            type="text"
            placeholder="Daily✍️"
            className="p-4 outline-none bg-transparent max-w-[400px] w-full rounded-md text-black border border-gray-300 text-base"
            ref={refTask} // Correct input ref for task
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
                <button className="px-2 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
                  {todo.type}
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
