type RatingProps = {
    value: number;
};

export default function Rating({ value }: RatingProps) {
    const fullStars = Math.floor(value);

    return (
        <div className="flex items-center gap-1 text-sm">
            {Array.from({ length: 5 }).map((_, i) => (
                <span
                    key={i}
                    className={
                        i < fullStars ? "text-yellow-400" : "text-gray-300"
                    }
                >
                    ★
                </span>
            ))}
            <span className="ml-1 text-gray-500 text-xs">({value})</span>
        </div>
    );
}
