interface ColorOptionProps {
	colors: string[];
	handleGuess: (color: string) => void;
	gameOver: boolean;
}
export default function ColorOption({
	colors,
	handleGuess,
	gameOver,
}: ColorOptionProps) {
	return (
		<div className="grid grid-cols-2 gap-4 mb-8" data-testid="colorOption">
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
	);
}
