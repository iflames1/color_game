interface GameOverProps {
	score: number;
	highScore: number;
	startNewGame: () => void;
}

export default function GameOver({
	score,
	highScore,
	startNewGame,
}: GameOverProps) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
			<div className="bg-white p-8 rounded-2xl text-center animate-pop-in text-black">
				<h2 className="text-3xl font-bold mb-4">Game Over! 🎮</h2>
				<p className="text-xl mb-6 text-green-600">
					Final Score: {score}
				</p>
				<p className="text-xl mb-6 text-purple-500">
					{score === highScore
						? `New High Score!: ${highScore} 🔥`
						: `High Score: ${highScore}`}
				</p>
				<button
					onClick={startNewGame}
					className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
				>
					Play Again
				</button>
			</div>
		</div>
	);
}
