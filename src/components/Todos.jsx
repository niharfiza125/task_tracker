import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask, updateTask, toggleTask, addTask } from '../features/tasks/tasksSlice';

function Todos() {
  const todos = useSelector((state) => state.tasks.tasks || []);
  const dispatch = useDispatch();

  const [editTaskId, setEditTaskId] = useState(null);
  const [newText, setNewText] = useState('');

 
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      parsedTodos.forEach((todo) => {
        console.log('Loading task from localStorage:', todo); 
        dispatch(addTask({ text: todo.text, completed: todo.completed }));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    console.log('Saving tasks to localStorage:', todos); 
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleEditClick = (id, currentText) => {
    setEditTaskId(id);
    setNewText(currentText);
  };

  const handleSaveClick = (id) => {
    if (newText.trim()) {
      dispatch(updateTask({ id, newText }));
      setEditTaskId(null);
      setNewText('');
    }
  };

  const handleCancelClick = () => {
    setEditTaskId(null);
    setNewText('');
  };

  const handleCheckboxChange = (id) => {
    dispatch(toggleTask(id));
  };

 
  const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);

  return (
    <>
      <div className="text-center text-xl font-bold mb-4">Tasks</div>
      <ul className="list-none max-w-md mx-auto">
        {sortedTodos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-white px-4 py-3 rounded-lg border border-black shadow-md"
            key={todo.id}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckboxChange(todo.id)}
              className="mr-3 w-5 h-5 cursor-pointer accent-green-500"
            />
            {editTaskId === todo.id ? (
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="bg-white text-black border border-black rounded px-2 py-1 focus:outline-none w-full"
              />
            ) : (
              <div className={`w-full ${todo.completed ? 'line-through' : ''}`}>
                {todo.text || 'No text available'}
              </div>
            )}
            <div className="flex space-x-2">
              {editTaskId === todo.id ? (
                <>
                  <button
                    onClick={() => handleSaveClick(todo.id)}
                    className="text-white bg-green-500 border-0 py-1 px-2 focus:outline-none hover:bg-green-600 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="text-white bg-gray-500 border-0 py-1 px-2 focus:outline-none hover:bg-gray-600 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(todo.id, todo.text)}
                    className="text-white bg-yellow-500 border-0 py-1 px-2 focus:outline-none hover:bg-yellow-600 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 3.487a1.875 1.875 0 012.651 0l1 1a1.875 1.875 0 010 2.65L7.12 20.53a4.5 4.5 0 01-1.79 1.122l-3.262.96.96-3.263a4.5 4.5 0 011.122-1.79L16.862 3.487z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => dispatch(removeTask(todo.id))}
                    className="text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 13h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;

