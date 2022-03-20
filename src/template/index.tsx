import type { Menu } from "./d";
import { initLayout } from "./layout";
import { initText } from "./text";

const initTemp = async (): Promise<Menu[]> => {
  const menu: Menu[] = [];
  menu.push(await initText());
  menu.push(await initLayout());
  return menu;
};

export default initTemp;
