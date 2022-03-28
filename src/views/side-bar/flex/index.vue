<template>
  <div tabindex="0" class="collapse collapse-plus bg-base-100 rounded-box">
    <input type="checkbox" class="peer" />
    <div
      class="collapse-title peer-checked:bg-base peer-checked:text-base-content text-xl font-medium"
    >
      Flex
    </div>
    <div class="collapse-content">
      <div class="btn-group">
        <button class="btn btn-active btn-outline">
          <i class="fa-solid fa-align-left" />
        </button>
        <button class="btn btn-outline">
          <i class="fa-solid fa-align-center" />
        </button>
        <button class="btn btn-outline">
          <i class="fa-solid fa-align-right" />
        </button>
        <button class="btn btn-outline">
          <i class="fa-solid fa-arrows-left-right" />
        </button>
      </div>
    </div>
  </div>
</template>
