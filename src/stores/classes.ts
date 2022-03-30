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
     * 返回 option 数据结构
     * @param attr 属性
     * @returns 返回属性对应的classname 否则返回所有
     */
    getClassesOptions(attr?: Attribute) {
      const classname: string[] = attr
        ? this.getClassesByAttr(attr)
        : this.getClasses();

      return classname.map((item) => {
        return {
          label: item,
          value: item,
        };
      });
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

    /**
     * 从classList中筛选出符合 attr 属性类的数组
     * @param classList 传入的数组 一般为当前选中元素的classname数组
     * @param attr 属性
     * @returns 满足attr属性的classname数组
     */
    filterByAttr(classList: string[], attr: Attribute) {
      const attrClassList = this.getClassesByAttr(attr);
      return classList.filter((item) => attrClassList.includes(item));
    },
  },
});
