import * as ad_temp from "@acss-dnd/template";

const initTemp = (): Menu[] => {
  const t = [];
  for (const i in ad_temp) {
    t.push(createMenu(ad_temp[i]));
  }

  return t;
};

export interface Menu {
  id: string;
  text: string;
  // 组件外部携带的className
  // eg: 文本标签 h1 h2 p ... 外面的 prose,可以直接格式化其中的文本
  wrapClass: string[];
  components: ad_temp.Template[];
}

const createMenu = (module: ad_temp.T): Menu => {
  const m: Menu = {
    id: "",
    text: "",
    wrapClass: module?.wrapClass || [],
    components: [],
  };
  for (const i in module) {
    const item = module[i];
    if (i === "name") {
      const name = item as string;
      m.id = name.split(" ")[0];
      m.text = name;
    } else {
      m.components.push(item as ad_temp.Template);
    }
  }

  return m;
};

export default initTemp;
