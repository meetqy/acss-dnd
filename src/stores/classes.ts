import type { UIPackage, Attribute, Classes } from "@/classname";
import classes from "@/classname";
import { defineStore } from "pinia";

interface State {
  classes: Classes;
}

export const useClassesStore = defineStore({
  id: "classes",
  state: (): State => {
    return {
      classes,
    };
  },

  actions: {
    /**
     * 获取所有的class
     */
    getClasses() {
      let classname: string[] = [];
      for (const i in this.classes) {
        const attrClass = this.getClassesByAttr(i as Attribute);
        classname = classname.concat(attrClass);
      }

      return classname;
    },

    /**
     * 通过属性获取分类
     * 会将所有的UIPackage合并为一个数组返回
     */
    getClassesByAttr(attr: Attribute) {
      let classname: string[] = [];
      for (const i in this.classes[attr]) {
        const item = this.classes[attr][i as UIPackage];
        classname = classname.concat(item);
      }

      return classname;
    },
  },
});
