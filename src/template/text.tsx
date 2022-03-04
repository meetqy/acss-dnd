export interface Template {
  jsx: JSX.Element;
  str: string;
}

/**
 * template的 str 不支持 class={"sss"} 变量逻辑运算的用法
 */
export const h1: Template = {
  jsx: <h1 class="text-center">这是标题1</h1>,
  str: `<h1 class="text-center">这是标题1</h1>`,
};

export const h2: Template = {
  jsx: <h2>这是标题2</h2>,
  str: `<h2>这是标题2</h2>`,
};

export const h3: Template = {
  jsx: <h3>这是标题3</h3>,
  str: `<h3>这是标题3</h3>`,
};

export const h4: Template = {
  jsx: <h4>这是标题4</h4>,
  str: `<h4>这是标题4</h4>`,
};

export const h5: Template = {
  jsx: <h5>这是标题5</h5>,
  str: `<h5>这是标题5</h5>`,
};

export const h6: Template = {
  jsx: <h6> 这是标题6</h6>,
  str: `<h6> 这是标题6</h6>`,
};

export const p: Template = {
  jsx: (
    <p>
      默认情况下，Tailwind 使用移动优先的断点系统，类似于 Bootstrap
      这些其它框架中的用法。 这意味着未加前缀的功能类 (像 uppercase)
      在所有的屏幕上都有效，而加了前缀的功能类（如
      md:uppercase）仅在指定断点及以上的屏幕上生效。
    </p>
  ),
  str: `<p>
  默认情况下，Tailwind 使用移动优先的断点系统，类似于 Bootstrap
  这些其它框架中的用法。 这意味着未加前缀的功能类 (像 uppercase)
  在所有的屏幕上都有效，而加了前缀的功能类（如
  md:uppercase）仅在指定断点及以上的屏幕上生效。
</p>`,
};

export const span: Template = {
  jsx: (
    <span>
      《奥特赛文》（日语：ウルトラセブン，英语：Ultra
      seven）是圆谷制作所制作的特摄电视剧，为1967年10月1日至1968年9月8日在日本TBS电视网毎周日19：00～19：30播映，全49集。
      本片在香港曾由佳艺电视购入，以《七星俠》译名于1976年播出（但仍未包括第12集）。香港TVB在2010年播映设定上与本作有关连的《梦比优斯·奥特曼》第46集时，正式将本作登场奥特曼“ウルトラセブン”的港译名称改为“超人Seven”。
    </span>
  ),
  str: `<span>
  《奥特赛文》（日语：ウルトラセブン，英语：Ultra
  seven）是圆谷制作所制作的特摄电视剧，为1967年10月1日至1968年9月8日在日本TBS电视网毎周日19：00～19：30播映，全49集。
  本片在香港曾由佳艺电视购入，以《七星俠》译名于1976年播出（但仍未包括第12集）。香港TVB在2010年播映设定上与本作有关连的《梦比优斯·奥特曼》第46集时，正式将本作登场奥特曼“ウルトラセブン”的港译名称改为“超人Seven”。
</span>`,
};

const temp: Template[] = [h1, h2, h3, h4, h5, h6, p, span];

export default temp;
