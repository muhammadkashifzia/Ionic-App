import { useEffect, useState } from "react";

type CountdownTimerProps = {
  initialSeconds: number;
  onComplete: () => void;
  colorBlack?: boolean;
};

export default function CountdownTimer({ initialSeconds, onComplete, colorBlack }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onComplete]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <p
      className={`text-center font-light opacity-80 text-lg ${colorBlack ? "text-black" : "text-white"}`}
    >
      {formatTime(seconds)}後にコードを再送信します
    </p>
  );
}
