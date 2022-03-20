import type { Menu } from "./d";
import Text from "./text";

const menu: Menu[] = [
  {
    id: "1",
    text: "文本",
    wrapClass: ["prose"],
    components: Text,
  },
];

export default menu;
