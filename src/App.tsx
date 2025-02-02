import { useCallback, useEffect, useState } from "react";
import "./App.css";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

function App() {
	const [targetColor, setTargetColor] = useState("");
	const [message, setMessage] = useState("Guess the correct color! ");
	const [score, setScore] = useState(0);

	const generateRandomColor = useCallback(() => {
		return colors[Math.floor(Math.random() * colors.length)];
	}, []);

	const startNewGame = useCallback(() => {
		setTargetColor(generateRandomColor());
		setScore(0);
		setMessage("Guess the correct color!");
	}, [generateRandomColor]);

	useEffect(() => {
		startNewGame();
		console.log("first");
	}, [startNewGame]);

	const handleGuess = (color: string) => {
		if (color === targetColor) {
			setScore(score + 1);
			setMessage("Correct! Well done! 🎉");
			setTargetColor(generateRandomColor());
		} else {
			setScore(score - 1);
			setMessage("Incorrect. Try again!");
		}
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center w-screen">
				<h1
					className="text-2xl font-bold"
					data-testid="gameInstructions"
				>
					Guess the Correct Color!
				</h1>
				<div
					className="w-24 h-24 mt-4 border-2 rounded"
					style={{
						backgroundColor: targetColor,
					}}
					data-testid="colorBox"
				></div>
				<div className="grid grid-cols-3 gap-4 mt-4">
					{colors.map((color) => (
						<button
							key={color}
							className="px-4 py-2 text-white rounded shadow-md"
							style={{ backgroundColor: color }}
							onClick={() => handleGuess(color)}
							data-testid="colorOption"
						>
							{color}
						</button>
					))}
				</div>
				<p className="mt-4 text-lg" data-testid="gameStatus">
					{message}
				</p>
				<p className="mt-2 text-lg font-bold" data-testid="score">
					Score: {score}
				</p>
				<button onClick={startNewGame} data-testid="newGameButton">
					New Game
				</button>
			</div>
		</>
	);
}

export default App;
