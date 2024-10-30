<script lang="ts">
    import Bingo from "../lib/Bingo";

    const bingo = new Bingo();
    let cells = bingo.cells;
    let bingoCount = bingo.bingoCount;

    const clickCell = (index: number) => {
        if (cells[index]) return;

        bingo.drawCell(index);
        cells = [...bingo.cells];
        bingoCount = bingo.bingoCount;
    };
</script>

<main>
    <div class="grid grid-rows-5 grid-cols-5 gap-4">
        {#each Array.from({ length: 25 }, (_, i) => i) as i}
            <button
                    on:click={() => clickCell(i)}
                    class={`${cells[i] ? "bg-gray-500" : "bg-gray-200"} h-16 w-16 flex items-center justify-center rounded-lg`}
            >
                {i + 1}
            </button>
        {/each}
    </div>
</main>
