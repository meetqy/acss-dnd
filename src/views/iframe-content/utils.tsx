/**
 * 因为 <template innerHtml={}></template>
 * 在jsx中无法使用，不能正常解析
 */
export const stringToJsx = (str: string): JSX.Element | null => {
  // <h1 class="xxx" .....> tag 前部分
  const t1 = str.match(/^<.*?>/);
  if (!t1) return null;

  // h1\s | h1>
  const t2 = (t1[0] as string).match(/[^<](.*?)[\s|>]/);
  if (!t2) return null;

  // h1
  const tag = (t2[0] as string).replace(/\s|>/g, "");

  // class="xxxx xxxx"
  const t3 = (t1[0] as string).match(/class=[\"|\'].*?[\"|\']/);
  const className = t3
    ? (t3[0] as string).replace(/class=/, "").replace(/\'|"/g, "")
    : "";

  const innerHtml = str.replace(/^<.*?>/g, "").replace(/<\/.*?>$/, "");

  return <tag class={className} v-html={innerHtml}></tag>;
};
