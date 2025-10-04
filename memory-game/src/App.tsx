import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center gap-4">
      Memory Game
      <button onClick={() => navigate("/game")}>Play Game</button>
    </div>
  );
}

export default App;
