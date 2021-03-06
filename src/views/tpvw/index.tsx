import { ref, computed, defineComponent } from "vue";
import * as ad_temp from "@acss-dnd/template";

export default defineComponent({
  setup() {
    const cur = ref<string>("breadcrumbs");
    const curTemps = computed(() => {
      const json = ad_temp[cur.value];
      const component = [];
      for (const i in json) {
        const item = json[i];
        if (i === "name") {
          continue;
        }

        component.push(item);
      }

      return component;
    });

    return () => (
      <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <div class="grid grid-cols-2 gap-4 p-4">
            {curTemps.value.map((item, index) => (
              <div>
                <div
                  class="border border-base-200 flex justify-center items-center cursor-pointer rounded-md shadow-sm hover:shadow-md transition-all"
                  style={{ minHeight: "300px" }}
                >
                  {item.jsx}
                </div>
                <p class="text-base text-center mt-4">
                  <a href="javascript:;" class="text-primary">
                    _{index + 1}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div class="drawer-side">
          <label for="my-drawer-2" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-80 bg-base-200 text-base-content">
            {Object.keys(ad_temp).map((key) => (
              <li>
                <a
                  class={`${cur.value === key ? "active" : ""}`}
                  onClick={() => {
                    cur.value = key;
                  }}
                >
                  {ad_temp[key].name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
});
