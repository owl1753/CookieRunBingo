<script>
    import {link} from "svelte-spa-router";
</script>

<main class="min-h-screen bg-gradient-to-b to-white flex items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4 sm:p-8 space-y-4 sm:space-y-6 mx-auto">
        <div class="text-center space-y-2 sm:space-y-4 mb-4 sm:mb-8">
            <h1 class="text-2xl sm:text-4xl font-bold">
                쿠키런: 모험의 탑 빙고 시뮬레이터
            </h1>
        </div>

        <div class="space-y-4 sm:space-y-6">
            <div class="p-3 sm:p-4 rounded-lg space-y-1">
                <p class="text-sm sm:text-base text-gray-700">
                    AI 추천을 통해 최적의 수를 찾거나, 빙고를 플레이할 수 있습니다.
                </p>
                <p class="text-xs text-gray-400">
                    '최적 수 찾기'에서는 기본으로 가운데 칸을 선택 후 시작합니다.
                </p>
            </div>

            <div class="text-center space-y-2 sm:space-y-0 sm:space-x-2">
                <button on:click={() => alert("준비 중입니다.")}
                        class="w-full sm:w-auto transition bg-blue-500 active:bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0">
                    빙고 플레이
                </button>
                <a use:link href="/game" class="inline-block w-full sm:w-auto">
                    <button class="w-full sm:w-auto transition bg-blue-500 active:bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        최적 수 찾기
                    </button>
                </a>
            </div>

            <div class="text-xs text-gray-300 mt-4">
                <p>이 페이지에는 데브시스터즈에서 제작한 '쿠키런 글꼴'이 적용되어 있습니다.
                    (<a class="text-gray-300 underline" href="https://www.cookierunfont.com/static/download/License_ko_en.pdf" target="_blank">라이센스</a>) <br>
                </p>
            </div>
        </div>
    </div>
</main>
