// bingo-worker.ts
import Bingo from '../lib/Bingo';

self.onmessage = (e) => {
    const {state, count} = e.data;
    const bingo = new Bingo(state, count);
    try {
        const result = bingo.solve();
        self.postMessage({ type: 'complete', result });
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : String(error);
        self.postMessage({
            type: 'error',
            error: errorMessage
        });
    }
};
