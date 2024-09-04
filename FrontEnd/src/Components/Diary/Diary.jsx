import { useState, useEffect, useRef } from 'react';
import { format, parse } from 'date-fns';
import { diaryDummyData } from './diarydummyData';
import { IoMdAdd } from "react-icons/io";
// import CalenderSvg from "../../Content/Svg/CalenderSvg.jsx";
import style from "./Diary.module.css";

export default function DiaryComponent() {
  const [todos, setTodos] = useState([]);
  const refTask = useRef();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const inputRef = useRef(null);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // const handleSvgClick = () => {
  //   // Programmatically open the date picker
  //   if (inputRef.current) {
  //     inputRef.current.click();
  //   }
  // };

  // const formattedDate = selectedDate ? format(new Date(selectedDate), 'MM/dd/yyyy') : '';

  useEffect(() => {
    // Load initial data from dummy function
    const initialTodos = diaryDummyData().map(entry => ({
      id: entry._id,
      text: entry.text.join(', '),
      date: format(parse(entry.Date, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd')
    }));
    setTodos(initialTodos);
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault(); // Prevent default form submission

    const newTodo = {
      id: Date.now(),
      text: refTask.current.value,
      date: selectedDate
    };

    setTodos([...todos, newTodo]);
    refTask.current.value = ''; // Clear the input field
  };

  const groupedTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.date]) {
      acc[todo.date] = [];
    }
    acc[todo.date].push(todo);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4 space-y-6">
      <form onSubmit={handleAddTodo} className="flex space-x-2 mb-4 flex-wrap gap-y-3 items-center justify-center">
      <div className="flex flex-col items-center">
      <label
        htmlFor="date"
        onClick={console.log("bhjv")}
        // className="flex flex-col justify-center w-[250px] h-[190px] items-center text-center text-neutral-700 cursor-pointer p-[5px] border-2 border-dashed border-[#ccc]"
      >
        {/* <CalenderSvg /> */}
      </label>
      <input
        type="date"
        defaultValue={selectedDate}
        onChange={handleDateChange}
        // className="hidden"
        ref={inputRef}
        id="date" // This id should match the htmlFor of the label
        aria-label="Select date"
      />
    </div>
    <div className="relative z-20 w-auto">
  <input 
    required 
    type="text" 
    placeholder="Daily✍️"
    className="p-4 outline-none bg-transparent max-w-[400px] w-full rounded-md text-black border border-gray-300 text-base"
  />
  <span className="absolute rounded-xl left-0 text-xs transform translate-x-3 -translate-y-2 px-1 bg-gray-900 border border-gray-300 text-gray-300">
    Write Here :
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
        {Object.entries(groupedTodos).map(([date, dateTodos]) => (
          <ul key={date} className={style.page}>
            <h2 className="text-lg font-semibold mb-2">{format(new Date(date), 'MMMM d, yyyy')}</h2>
            {dateTodos.map((todo, index) => (
              <li key={todo.id} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md shadow-sm">
                <div className={style.margin}></div>
                <span className="font-medium">{index + 1}.</span>
                <span className="flex-grow">{todo.text}</span>
                <button
                  className="px-2 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Action
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
