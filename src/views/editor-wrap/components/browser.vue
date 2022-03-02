<template>
  <div
    class="w-full max-w-screen-xl m-auto overflow-hidden flex-1 pb-10"
    style="max-height: 92vh"
  >
    <div
      class="bg-white w-full flex rounded-xl overflow-hidden shadow flex-col h-full"
    >
      <div
        class="h-12 w-full px-4 flex justify-between items-center bg-gray-50 flex-shrink-0 border-b"
      >
        <div class="flex h-full items-center w-14 justify-between">
          <div class="w-3 h-3 bg-red-500 rounded-full"></div>
          <div class="w-3 h-3 bg-orange-400 rounded-full"></div>
          <div class="w-3 h-3 bg-green-600 rounded-full"></div>
        </div>
        <div class="bg-white w-96 h-8 flex items-center justify-center rounded">
          <span
            class="text-blue-500 cursor-pointer underline underline-offset-2"
            >移动端优先</span
          >
          <span class="mx-4 text-gray-200">|</span>
          <span class="cursor-pointer text-gray-500">PC端优先</span>
        </div>
        <div class="flex w-24 justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      <div class="w-full h-full bg-white flex-1">
        <iframe
          ref="iframe"
          class="w-full h-full"
          frameborder="0"
          title="edit page"
        />
      </div>
    </div>
  </div>
</template>
