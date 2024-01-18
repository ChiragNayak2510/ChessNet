
const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="spinner w-80 mx-auto flex gap-2 justify-center">
        <div className="dot w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="dot w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-300"></div>
        <div className="dot w-4 h-4 bg-purple-500  rounded-full animate-bounce delay-600"></div>
      </div>
    </div>
  );
};

export default Spinner;
