import Addtodo from './components/Addtodo';
import Todos from './components/Todos';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Tasks Tracker</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <Addtodo />
        <Todos />
      </div>
    </div>
  );
}

export default App;
