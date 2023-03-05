import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EnemyPoints, GameStatuses } from "@/shared/constants";

import { GameState } from "./types";

const initialState: GameState = {
  status: GameStatuses.NOT_ACTIVE,
  isModalOpened: false,
  isMutedSound: false,
  score: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameStatus: (state, { payload }: PayloadAction<GameStatuses>) => {
      state.status = payload;
      state.isModalOpened = payload > GameStatuses.ACTIVE;
    },
    toggleIsMutedSound: state => {
      state.isMutedSound = !state.isMutedSound;
    },
    incrementScoreByEnemy: (
      state,
      { payload }: PayloadAction<keyof typeof EnemyPoints>
    ) => {
      state.score += EnemyPoints[payload];
    },
    resetScore: state => {
      state.score = 0;
    },
  },
});

export const { setGameStatus, toggleIsMutedSound, incrementScoreByEnemy, resetScore } =
  gameSlice.actions;

export const gameReducer = gameSlice.reducer;
