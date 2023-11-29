import React, { useEffect } from "react"
import Confetti from 'react-confetti'

function ConfettiDisplay({ show, restartGame }) {
  useEffect(() => {
    if (show) {
      const handleRestartKeyPress = (event) => {
        if (event.code === 'Space') {
          restartGame()
        }
      }

      window.addEventListener('keydown', handleRestartKeyPress)
      return () => {
        window.removeEventListener('keydown', handleRestartKeyPress)
      }
    }
  }, [show, restartGame])

  return show ? (
    <div className='w-screen h-screen absolute overflow-hidden'>
      <Confetti />
    </div>
  ) : null
}

export default ConfettiDisplay
