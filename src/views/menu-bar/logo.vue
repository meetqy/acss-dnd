<template>
  <div
    class="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex"
  >
    <a
      href="/"
      aria-current="page"
      aria-label="Homepage"
      class="flex-0 btn btn-ghost px-2"
    >
      <div
        class="font-title text-primary inline-flex items-center text-lg transition-all duration-200 md:text-3xl"
      >
        <div class="avatar mr-2">
          <div class="w-12 rounded-full">
            <img src="/favicon.ico" alt="" />
          </div>
        </div>
        <span class="uppercase">U</span>
        <span class="text-base-content lowercase">ltra</span>
      </div>
    </a>
    <a
      href="javascript:;"
      class="link link-hover font-mono text-xs text-opacity-50"
    >
      <div data-tip="v0.0.1" class="tooltip tooltip-bottom">v0.0.1</div>
    </a>
  </div>
</template>
