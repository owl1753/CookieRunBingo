<script>
    import {link} from "svelte-spa-router";
</script>

<main class="h-full bg-gradient-to-b to-white flex items-center justify-center p-6">
    <div class="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div class="text-center space-y-4 mb-8">
            <h1 class="text-4xl font-bold mb-4">
                쿠키런: 모험의 탑 빙고 시뮬레이터
            </h1>
        </div>

        <div class="space-y-6">
            <div class="p-4 rounded-lg">
                <p class="text-gray-700">
                    최적화 알고리즘을 통해 최적의 수를 찾을 수 있습니다
                </p>
            </div>

            <div class="text-center">
                <a use:link href="/game">
                    <button class="transition bg-blue-500 active:bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        AI와 플레이
                    </button>
                </a>
                <a use:link href="/game">
                    <button class="transition bg-blue-500 active:bg-blue-900  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        나 혼자 플레이
                    </button>
                </a>
            </div>
        </div>
    </div>
</main>
