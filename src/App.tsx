import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
const GAME_DURATION = 3000;

function App() {
	const [targetColor, setTargetColor] = useState("");
	const [message, setMessage] = useState("Guess the correct color! ");
	const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
	const [gameOver, setGameOver] = useState(false);
	const [score, setScore] = useState(0);
	const [scoreFeedback, setScoreFeedback] = useState<number | null>(null);

	const generateRandomColor = useCallback(() => {
		return colors[Math.floor(Math.random() * colors.length)];
	}, []);

	const startNewGame = useCallback(() => {
		setTargetColor(generateRandomColor());
		setScore(0);
		setMessage("Guess the correct color!");
		setTimeLeft(GAME_DURATION);
		setGameOver(false);
	}, [generateRandomColor]);

	useEffect(() => {
		startNewGame();
	}, [startNewGame]);

	useEffect(() => {
		let timer: number | undefined;
		if (timeLeft > 0 && !gameOver) {
			timer = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);
		} else if (timeLeft === 0) {
			setGameOver(true);
		}
		return () => clearInterval(timer);
	}, [timeLeft, gameOver]);

	const handleGuess = (color: string) => {
		if (gameOver) return;

		if (color === targetColor) {
			setScore((prev) => prev + 1);
			setMessage("Correct! Well done! 🎉");
			setTargetColor(generateRandomColor());
			setScoreFeedback(1);
		} else {
			setScore((prev) => prev - 1);
			setMessage("Incorrect. Try again!");
			setScoreFeedback(-1);
		}

		setTimeout(() => setScoreFeedback(null), 800);
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen w-screen p-4">
				{/* Game Over Modal */}
				{gameOver && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						<div className="bg-white p-8 rounded-2xl text-center animate-pop-in">
							<h2 className="text-3xl font-bold mb-4">
								Game Over! 🎮
							</h2>
							<p className="text-xl mb-6">Final Score: {score}</p>
							<button
								onClick={startNewGame}
								className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
							>
								Play Again
							</button>
						</div>
					</div>
				)}

				{/* Main Game Interface */}
				<div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full flex flex-col">
					<h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
						Color Game
					</h1>

					<div className="flex flex-col items-center mb-8">
						<div className="relative">
							<div
								className="w-32 h-32 rounded-2xl shadow-lg border-4 border-white transition-all duration-300"
								style={{ backgroundColor: targetColor }}
								data-testid="colorBox"
							/>
							{scoreFeedback && (
								<div
									className={`absolute -top-8 left-1/2 -translate-x-1/2 text-3xl font-bold ${
										scoreFeedback > 0
											? "text-green-500"
											: "text-red-500"
									} animate-fly-up`}
								>
									{scoreFeedback > 0 ? "+1" : "-1"}
								</div>
							)}
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 mb-8">
						{colors.map((color) => (
							<button
								key={color}
								onClick={() => handleGuess(color)}
								className="h-16 rounded-xl text-white font-medium shadow-md transition-transform hover:scale-105 active:scale-95"
								style={{ backgroundColor: color }}
								disabled={gameOver}
							>
								{color}
							</button>
						))}
					</div>

					<div className="text-center space-y-4">
						<p className="text-xl font-semibold text-gray-700">
							{message}
						</p>
						<div className="flex justify-center items-center gap-4">
							<div className="bg-gray-100 px-4 py-2 rounded-full text-blue-600">
								<span className="font-bold ">Score:</span>
								<span className="ml-2 text-xl">{score}</span>
							</div>
							<div className="bg-gray-100 px-4 py-2 rounded-full text-red-600">
								<span className="font-bold ">Time:</span>
								<span className="ml-2 text-xl">
									{timeLeft}s
								</span>
							</div>
						</div>
					</div>

					<button
						onClick={startNewGame}
						className="mt-8 bg-gray-800 text-white px-6 py-2 rounded-full w-fit mx-auto hover:bg-gray-900 transition-colors"
					>
						New Game
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
