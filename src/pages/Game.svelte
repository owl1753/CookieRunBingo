<script lang="ts">
    import Bingo from "@/lib/Bingo";
    import {onMount} from "svelte";

    const bingo = new Bingo();
    let cells = [...bingo.cells];
    let bingoCount = bingo.bingoCount;
    let count = bingo.count;
    let loading = false;
    let error: string | null = null;
    let result: { expect: number, state: number } | null = null;
    let worker: Worker;

    const updateCell = (index: number) => {
        bingo.drawCell(index);
        cells = [...bingo.cells];
        bingoCount = bingo.bingoCount;
        count = bingo.count;
    }

    const createWorker = () => {
        worker = new Worker(new URL('../workers/bingo-worker.ts', import.meta.url), { type: 'module' });

        worker.onmessage = (e) => {
            const { type, result: workerResult, error: workerError } = e.data;

            switch (type) {
                case 'complete':
                    result = workerResult;
                    loading = false;
                    worker.terminate();
                    if (result) updateCell(result.state);
                    break;
                case 'error':
                    error = workerError;
                    loading = false;
                    worker.terminate();
                    break;
            }
        };

        worker.onerror = (e) => {
            error = e.message;
            loading = false;
            worker.terminate();
        };
    };

    const calculate = () => {
        if (worker) {
            worker.terminate();
        }

        createWorker();

        loading = true;
        worker.postMessage({state: bingo.state, count: bingo.count});
    };

    onMount(() => {
        updateCell(12); // (2, 2)
    });

    const clickCell = (index: number) => {
        if (cells[index]) return;
        if (bingo.count >= 16) return;

        updateCell(index);

        if (bingo.count % 2 == 0 && bingo.count < 16) calculate();
    };
</script>


<main>
    <div class="grid grid-rows-5 grid-cols-5 gap-4">
        {#if loading}
            <div class="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                <div class="bg-white p-4 rounded-lg">
                    <p>최적 수 계산 중...</p>
                </div>
            </div>
        {/if}
        {#each Array.from({ length: 25 }, (_, i) => i) as i}
            <button
                    on:click={() => clickCell(i)}
                    class={`${cells[i] ? 'bg-gray-500' : 'bg-gray-200'} h-16 w-16 flex items-center justify-center rounded-lg`}
            >
                {i + 1}
            </button>
        {/each}
    </div>
    <div>
        <p>칠한 개수: {count}</p>
        <p>빙고: {bingoCount}</p>
        {#if result}
            <p>빙고 기댓값: {result.expect}</p>
        {/if}
    </div>
</main>
