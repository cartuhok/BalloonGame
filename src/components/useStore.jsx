// store.js
import { create } from 'zustand';

export const useStore = create(set => ({
  score: 0,
  incrementScore: () => set(state => ({ score: state.score + 100 })),
  resetScore: () => set({ score: 0 }),
}));
