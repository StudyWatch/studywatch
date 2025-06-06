// src/reducers/wordsReducer.js
export const initialState = {
  words: [],
  spareWords: [],
  undoStack: [],
  initialCount: 0
};

export function wordsReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE': {
      const allWords = action.payload.words;
      const limit = action.payload.limit;
      return {
        ...state,
        words: allWords.slice(0, limit),
        spareWords: allWords.slice(limit),
        undoStack: [],
        initialCount: allWords.length
      };
    }
    case 'SET_INITIAL_COUNT': {
      return {
        ...state,
        initialCount: action.payload.count
      };
    }
    case 'MARK_KNOWN': {
      const idx = action.payload.idx;
      if (state.spareWords.length === 0) return state;
      const replacement = state.spareWords[0];
      return {
        ...state,
        words: state.words.map((w, i) => (i === idx ? replacement : w)),
        spareWords: state.spareWords.slice(1),
        undoStack: [
          {
            idx,
            prevWord: state.words[idx],
            nextWord: replacement
          },
          ...state.undoStack
        ]
      };
    }
    case 'UNDO': {
      if (state.undoStack.length === 0) return state;
      const [last, ...rest] = state.undoStack;
      return {
        ...state,
        words: state.words.map((w, i) => (i === last.idx ? last.prevWord : w)),
        spareWords: [last.nextWord, ...state.spareWords],
        undoStack: rest
      };
    }
    case 'TRIGGER_ANIMATE_TO_FAVORITE': {
      const idx = action.payload.idx;
      const updatedWords = state.words.map((w, i) =>
        i === idx ? { ...w, animateToFavorite: true } : w
      );
      return {
        ...state,
        words: updatedWords
      };
    }
    default:
      return state;
  }
}
