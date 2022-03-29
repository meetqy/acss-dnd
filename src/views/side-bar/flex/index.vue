<template>
  <div tabindex="0" class="collapse collapse-plus bg-base-100 rounded-box">
    <input type="checkbox" class="peer" />
    <div
      class="collapse-title peer-checked:bg-base peer-checked:text-base-content text-xl font-medium"
    >
      Flex
    </div>
    <div class="collapse-content">
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">方向（默认：row）</span>
          <input type="checkbox" class="toggle toggle-primary" checked />
        </label>
      </div>
      <div class="btn-group mt-4">
        <button class="btn btn-active btn-outline">
          <span title="justify-start">
            <ic:baseline-align-horizontal-left />
          </span>
        </button>

        <button class="btn btn-outline">
          <span title="justify-between">
            <radix-icons:space-between-horizontally />
          </span>
        </button>
        <button class="btn btn-outline">
          <span title="justify-around">
            <fluent:align-space-between-horizontal-20-filled />
          </span>
        </button>
        <button class="btn btn-outline">
          <span title="justify-center">
            <ic:baseline-align-horizontal-center />
          </span>
        </button>
        <button class="btn btn-outline">
          <span title="justify-end">
            <ic:baseline-align-horizontal-right />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
