
import { useEffect, useState } from "react";

const CountDown = (props) => {

  const [count, setCount] = useState(300)

  useEffect(() => {
    if (count === 0) {
      props.onTimeUp()
      return;
    }
    const timer = setInterval(() => {
      // lap vo han
      setCount(count - 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [count])

  const timerToString = () => {
    let hours = ('0' + Math.floor(count / 3600)).slice(-2);
    let minutes = ('0' + Math.floor(count / 60)).slice(-2);
    let seconds = ('0' + count % 60).slice(-2);
    return /*hours + ":" +*/ minutes + ":" + seconds;
  }
  return (
    <>
      <div className="text-danger">
        {timerToString(count)}
      </div>
    </>
  )
}

export default CountDown;