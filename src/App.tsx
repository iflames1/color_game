import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Stats from "./stats";
import ColorOption from "./color-option";
import ColorBox from "./color-box";
import GameOver from "./game-over";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
const GAME_DURATION = 30;

function App() {
	const [targetColor, setTargetColor] = useState("");
	const [message, setMessage] = useState("Pick the correct color!");
	const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
	const [gameOver, setGameOver] = useState(false);
	const [score, setScore] = useState(0);
	const [scoreFeedback, setScoreFeedback] = useState<number | null>(null);
	const [isCountingDown, setIsCountingDown] = useState(false);
	const [highScore, setHighScore] = useState(
		() => Number(localStorage.getItem("highScore")) || 0
	);

	const generateRandomColor = useCallback(() => {
		return colors[Math.floor(Math.random() * colors.length)];
	}, []);

	const startNewGame = useCallback(() => {
		setTargetColor(generateRandomColor());
		setScore(0);
		setMessage("Pick the correct color!");
		setTimeLeft(GAME_DURATION);
		setGameOver(false);
		setIsCountingDown(false);
	}, [generateRandomColor]);

	useEffect(() => {
		startNewGame();
	}, [startNewGame]);

	useEffect(() => {
		console.log("first");

		if (!isCountingDown || gameOver) return;

		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					setGameOver(true);

					if (score > highScore) {
						setHighScore(score);
						localStorage.setItem("highScore", String(score));
					}
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [isCountingDown, gameOver, timeLeft, score, highScore]);

	const handleGuess = (color: string) => {
		if (gameOver) return;

		if (!isCountingDown) {
			setIsCountingDown(true);
		}

		if (color === targetColor) {
			setScore((prev) => prev + 1);
			setMessage("Correct! Well done! 🎉 Keep going!");
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
				{gameOver && (
					<GameOver
						score={score}
						highScore={highScore}
						startNewGame={startNewGame}
					/>
				)}

				<div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full flex flex-col">
					<h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
						Color Game
					</h1>
					<p
						className={`text-center text-xl font-semibold ${
							score <= 0
								? "text-red-600"
								: score > 0 && score <= highScore
								? "text-green-600"
								: "text-blue-600"
						} mb-4`}
						data-testid="score"
					>
						Score: {score}
					</p>
					<ColorBox
						targetColor={targetColor}
						scoreFeedback={scoreFeedback}
					/>
					<ColorOption
						colors={colors}
						handleGuess={handleGuess}
						gameOver={gameOver}
					/>
					<Stats
						message={message}
						highScore={highScore}
						timeLeft={timeLeft}
						isCountingDown={isCountingDown}
					/>
					<button
						onClick={startNewGame}
						className="mt-8 bg-gray-800 text-white px-6 py-2 rounded-full w-fit mx-auto hover:bg-gray-900 transition-colors"
						data-testid="newGameButton"
					>
						New Game
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
