import { Template, TemplateType } from "@acss-dnd/template";

export const temp: Template = {
  type: TemplateType.temp,
  jsx: (
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>Copyright © 2022 - All right reserved by ACME Industries Ltd</p>
      </div>
    </footer>
  ),
  str: `<footer class="footer footer-center p-4 bg-base-300 text-base-content">
  <div>
    <p>Copyright © 2022 - All right reserved by ACME Industries Ltd</p>
  </div>
</footer>`,
};
