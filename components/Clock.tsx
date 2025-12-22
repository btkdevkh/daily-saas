import { useEffect, useRef } from "react";

const Clock = () => {
  const hourRef = useRef<HTMLDivElement | null>(null);
  const minuteRef = useRef<HTMLDivElement | null>(null);
  const secondRef = useRef<HTMLDivElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const clock = () => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const ms = date.getMilliseconds();

    const hourAngle = ((hour % 12) + minute / 60) * 30;
    const minuteAngle = (minute + second / 60) * 6;
    const secondAngle = (second + ms / 1000) * 6;

    if (hourRef.current) {
      hourRef.current.style.transform = `rotate(${hourAngle}deg)`;
    }

    if (minuteRef.current) {
      minuteRef.current.style.transform = `rotate(${minuteAngle}deg)`;
    }

    if (secondRef.current) {
      secondRef.current.style.transform = `rotate(${secondAngle}deg)`;
    }

    rafIdRef.current = requestAnimationFrame(clock);
  };

  useEffect(() => {
    rafIdRef.current = requestAnimationFrame(clock);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute top-[85%] left-1/2 -translate-y-[85%] -translate-x-1/2 w-[200px] h-[200px] border-6 border-dust-grey rounded-full">
      {numbers.map((number, idx) => {
        const angle = idx * 30;

        return (
          <div
            key={idx}
            className="absolute w-full h-full font-bold text-xl bg-transparent flex justify-center"
            style={{
              rotate: `${angle}deg`,
            }}
          >
            <span>{number}</span>
          </div>
        );
      })}

      <div
        className="absolute left-1/2 bottom-1/2 -translate-x-1/2 origin-bottom z-10 w-1 h-[35%] bg-graphite rounded"
        ref={hourRef}
      ></div>
      <div
        className="absolute left-1/2 bottom-1/2 -translate-x-1/2 origin-bottom z-10 w-1 h-[40%] bg-graphite rounded"
        ref={minuteRef}
      ></div>
      <div
        className="absolute left-1/2 bottom-1/2 -translate-x-1/2 origin-bottom z-10 w-1 h-[50%] bg-red-500 rounded"
        ref={secondRef}
      ></div>
      <div className="absolute left-1/2 bottom-1/2 -translate-y-1/2 -translate-x-1/2 origin-bottom-left z-1000 w-5 h-5 rounded-full top-1/2 bg-red-500"></div>
      <div className="h-full flex flex-col justify-start items-center mt-11 text-md font-bold text-white [text-shadow:1px_1px_3px_#000]">
        <span>DailySaaS</span>
      </div>
    </div>
  );
};

export default Clock;

const numbers = [
  "XII",
  "I",
  "II",
  "III",
  "IIII",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
];
