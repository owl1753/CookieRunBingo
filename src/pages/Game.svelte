<script lang="ts">
    import Bingo from "@/lib/Bingo";
    import {onMount} from "svelte";

    let bingo = new Bingo();
    let cells = [...bingo.cells];
    let bingoCount = bingo.bingoCount;
    let count = bingo.count;
    let loading = false;
    let error: string | null = null;
    let result: { expect: number, state: number } | null = null;
    let worker: Worker;

    const updateCell = (index: number) => {
        if (!bingo.cells[index]) bingo.drawCell(index);
        cells = [...bingo.cells];
        bingoCount = bingo.bingoCount;
        count = bingo.count;
        result = null;
    }

    const init = () => {
        bingo.init();
        cells = [...bingo.cells];
        bingoCount = bingo.bingoCount;
        count = bingo.count;
        result = null;
        localStorage.removeItem('state');
        localStorage.removeItem('count');
        localStorage.removeItem('resultIndex');
        localStorage.removeItem('resultExpect');
        updateCell(12);
    }

    const save = () => {
        localStorage.setItem('state', JSON.stringify(bingo.state));
        localStorage.setItem('count', JSON.stringify(bingo.count));
        if (result) {
            localStorage.setItem('resultIndex', JSON.stringify(result.state));
            localStorage.setItem('resultExpect', JSON.stringify(result.expect));
        }
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
        const state = localStorage.getItem('state');
        const count = localStorage.getItem('count');
        const resultIndex = localStorage.getItem('resultIndex');
        const resultExpect = localStorage.getItem('resultExpect');
        if (state && count) bingo = new Bingo(state ? JSON.parse(state) : null, count ? JSON.parse(count) : 0);
        updateCell(12); // (2, 2)
        if (!!resultIndex && !!resultExpect) result = {state: JSON.parse(resultIndex), expect: JSON.parse(resultExpect)};
    });

    const clickCell = (index: number) => {
        if (cells[index]) return;
        if (bingo.count >= 16) return;

        updateCell(index);

        if (bingo.count % 2 == 0 && bingo.count < 16) calculate();
    };
</script>


<main class="max-w-md m-auto">
    {#if loading}
        <div class="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-4 rounded-lg">
                <p>최적 수 계산 중...</p>
            </div>
        </div>
    {/if}
    <div class="flex justify-between mb-2">
        <p class="text-left">남은 횟수: {16 - count}</p>
        <p>빙고: {bingoCount}</p>
    </div>

    <div class="grid grid-rows-5 grid-cols-5 gap-2 ">
        {#each Array.from({ length: 25 }, (_, i) => i) as i}
            <button
                    on:click={() => clickCell(i)}
                    class={`${
                cells[i]
                    ? 'bg-gray-500'
                    : (i === result?.state ? 'bg-green-300' : 'bg-gray-200')
            } aspect-square w-full flex items-center justify-center rounded-lg text-sm sm:text-base`}
            >
                {i + 1}
            </button>
        {/each}
    </div>
    <div class="flex justify-end gap-1 mt-2">
        <button on:click={save} class="transition bg-blue-500 active:bg-blue-900  hover:bg-blue-700 text-sm text-white py-1 px-2 rounded">
            저장하기
        </button>
        <button on:click={init} class="transition bg-white active:bg-gray-400  hover:bg-gray-200 text-sm text-blue-500 py-1 px-2 rounded">
            초기화
        </button>
    </div>
</main>
