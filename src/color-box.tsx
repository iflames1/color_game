interface ColorBoxProps {
	targetColor: string;
	scoreFeedback: number | null;
}
export default function ColorBox({
	targetColor,
	scoreFeedback,
}: ColorBoxProps) {
	return (
		<div className="flex flex-col items-center mb-8">
			<div className="relative z-0">
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
	);
}
