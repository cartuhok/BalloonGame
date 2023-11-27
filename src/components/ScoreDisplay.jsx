// ScoreDisplay.jsx
import React from "react";
import { useStore } from '../stores/useStore';

export default function ScoreDisplay() {
  const score = useStore(state => state.score);

  return (
    <div className="score-display absolute top-0 left-0 m-4 z-50 text-3xl text-[gold] drop-shadow-lg select-none font-PressStart2P-Regular">
      Score: {score}
    </div>
  );
};
