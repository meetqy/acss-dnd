import type { Menu } from "./d";
import { initText } from "./text";

const initTemp = async (): Promise<Menu[]> => {
  const menu: Menu[] = [];
  menu.push(await initText());
  return menu;
};

export default initTemp;
