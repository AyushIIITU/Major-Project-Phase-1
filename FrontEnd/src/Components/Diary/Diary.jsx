'use client'

import { useState, useEffect } from 'react'
import { format, parse } from 'date-fns'
import { diaryDummyData } from './diarydummyData'

export default function DiaryComponent() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  useEffect(() => {
    // Load initial data from dummy function
    const initialTodos = diaryDummyData().map(entry => ({
      id: entry._id,
      text: entry.text.join(', '),
      date: format(parse(entry.Date, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd')
    }))
    setTodos(initialTodos)
  }, [])

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        date: selectedDate
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  
  const groupedTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.date]) {
      acc[todo.date] = []
    }
    acc[todo.date].push(todo)
    return acc
  }, {})

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex space-x-2 mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new entry"
          className="flex-grow p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {Object.entries(groupedTodos).map(([date, dateTodos]) => (
        <div key={date} className="p-4 border border-gray-200 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">{format(new Date(date), 'MMMM d, yyyy')}</h2>
          <ul className="space-y-2">
            {dateTodos.map((todo, index) => (
              <li key={todo.id} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md shadow-sm">
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
        </div>
      ))}
    </div>
  )
}
