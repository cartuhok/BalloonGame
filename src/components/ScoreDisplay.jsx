// ScoreDisplay.jsx
import React from "react";
import { useStore } from './useStore';

export default function ScoreDisplay() {
  const score = useStore(state => state.score);

  return (
    <div className="score-display absolute top-0 left-0 m-4 z-50 text-red text-2xl select-none font-LuckiestGuy-Regular">
      Score: {score}
    </div>
  );
};
