interface StatsProps {
	message: string;
	highScore: number;
	timeLeft: number;
	isCountingDown: boolean;
}
export default function Stats({
	message,
	highScore,
	timeLeft,
	isCountingDown,
}: StatsProps) {
	return (
		<div className="text-center space-y-4">
			{isCountingDown ? (
				<p
					className="text-xl font-semibold text-gray-700"
					data-testid="gameStatus"
				>
					{message}
				</p>
			) : (
				<p
					className="text-xl font-semibold text-gray-700"
					data-testid="gameInstructions"
				>
					Guess the correct color!
				</p>
			)}

			<div className="flex justify-center items-center gap-4">
				<div className="bg-gray-100 px-4 py-2 rounded-full text-blue-600">
					<span className="font-bold ">High Score:</span>
					<span className="ml-2 text-xl">{highScore}</span>
				</div>
				<div className="bg-gray-100 px-4 py-2 rounded-full text-red-600">
					<span className="font-bold ">Time:</span>
					<span className="ml-2 text-xl">{timeLeft}s</span>
				</div>
			</div>
		</div>
	);
}
