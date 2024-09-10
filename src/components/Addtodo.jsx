import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

function AddTodo() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTask({ text: input, completed: false }));
      setInput('');
    }
  };

  return (
    <div className="flex justify-center items-center my-6 px-4">
      <form onSubmit={addTodoHandler} className="flex items-center space-x-3 w-full max-w-3xl">
        <input
          type="text"
          className="bg-transparent border border-gray-400 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-base outline-none text-gray-800 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out shadow-md flex-grow"
          placeholder="Enter a Todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-transparent border border-indigo-500 text-indigo-500 rounded-lg py-2 px-4 flex items-center justify-center focus:outline-none hover:bg-indigo-500 hover:text-white transition-colors duration-200 ease-in-out shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 12L7.5 21V3l9.75 9z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default AddTodo;

