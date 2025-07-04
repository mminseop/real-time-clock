import { useState, useEffect } from 'react';
/**
 * Clock 컴포넌트
 *
 * 실시간 시계를 표시하고 사용자가 시계를 시작하거나 정지할 수 있는 React 함수형 컴포넌트입니다.
 * 시간은 "시", "분", "초"로 나뉘어 표시됩니다.
 *
 * 주요 기능:
 * - 현재 시간을 "HH:mm:ss" 형식으로 표시합니다.
 * - 시계가 실행 중일 때 매초마다 시간을 업데이트합니다.
 **/

function Clock() {
  const [time, setTime] = useState(new Date());
  const [stop, setStop] = useState(false);

  useEffect(() => {
    if (stop) return; // stop이 true면 바로 정지 (일시정지 상태)

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // 언마운트 시 타이머 정리
  }, [stop]);

  const getTimes = (time) => {
    const hh = String(time.getHours()).padStart(2, '0');
    const mm = String(time.getMinutes()).padStart(2, '0');
    const ss = String(time.getSeconds()).padStart(2, '0');
    const fullTimeString = `${hh}시${mm}분${ss}초`;

    return (
      <>
        {fullTimeString.split('').map((x, index) => (
          <div key={index}>{x}</div>
        ))}
      </>
    );
  };

  return (
    <div className="timer-container">
      <h2 className="timer-title">Real-Time-Clock</h2>
      <div className="time-wrap">{getTimes(time)}</div>
      <button className={`timer-stop-button ${stop ? 'active' : ''}`} onClick={() => setStop(!stop)}>
        {stop ? '다시시작' : '일시정지'}
      </button>
    </div>
  );
}

export default Clock;
