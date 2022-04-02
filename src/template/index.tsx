import { initBreadcrumbs } from "./breadcrumbs";
import { initCountdown } from "./countdown";
import type { Menu } from "./d";
// import { initFooter } from "./footer";
import { initHero } from "./hero";
import { initLayout } from "./layout";
import { initText } from "./text";
import temp from "@acss-dnd/template";

const footer = [{ jsx: <p>这是footer</p>, str: `<p>这是footer</p>` }];

console.log(temp.Footer, footer);

const initTemp = async (): Promise<Menu[]> => {
  const menu: Menu[] = [];
  menu.push({
    id: "Footer",
    text: "Footer 底部说明",
    wrapClass: [""],
    components: temp.Footer,
  });
  menu.push(await initText());
  menu.push(await initLayout());
  // menu.push(await initFooter());
  menu.push(await initHero());
  menu.push(await initBreadcrumbs());
  menu.push(await initCountdown());
  return menu;
};

export default initTemp;
