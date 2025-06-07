function App() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white p-10">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Talkify</h1>
        <p className="text-gray-600 mb-8">A simple chat room to connect with people...</p>
        <p className="text-gray-600 font-bold mb-4">Enter your name and click Start</p>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Enter your name"
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
          <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
            Start Chatting
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;