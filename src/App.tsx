import { useCallback, useEffect, useState } from "react";
import "./App.css";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

function App() {
	const [targetColor, setTargetColor] = useState("");
	const [message, setMessage] = useState("Guess the correct color! ");
	const [score, setScore] = useState(0);

	const generateRandomColor = useCallback(() => {
		const randomColor = colors[Math.floor(Math.random() * colors.length)];
		setTargetColor(randomColor);
	}, []);

	const startNewGame = useCallback(() => {
		generateRandomColor();
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
			generateRandomColor();
		} else {
			setScore(score - 1);
			setMessage("Incorrect. Try again!");
		}
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<h1>Guess the Correct Color!</h1>
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
							style={{ backgroundColor: color }}
							onClick={() => handleGuess(color)}
							data-testid="colorOption"
						>
							{color}
						</button>
					))}
				</div>
				<p data-testid="gameStatus">{message}</p>
				<p>Score: {score}</p>
				<button onClick={startNewGame} data-testid="newGameButton">
					New Game
				</button>
			</div>
		</>
	);
}

export default App;
