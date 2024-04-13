import { makeHtmlAttributes, RollupHtmlTemplateOptions } from '@rollup/plugin-html';

export function template(options?: RollupHtmlTemplateOptions) {
    if (!options) {
        return '';
    }
    const { files, attributes, publicPath, meta, title } = options;
    const scripts = (files.js || [])
        .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.script);
            return `<script src="${publicPath}${fileName}"${attrs}></script>`;
        })
        .join('\n');
    const links = (files.css || [])
        .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.link);
            return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
        })
        .join('\n');
    const metas = meta
        .map(input => {
            const attrs = makeHtmlAttributes(input);
            return `<meta${attrs}>`;
        })
        .join('\n');
    return `
<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
  <head>
    ${metas}
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css" integrity="sha512-jnSuA4Ss2PkkikSOLtYs8BlYIeeIK1h99ty4YfvRPAlzr377vr3CXDb7sb7eEEBYjDtcYj+AjBH3FLv5uSJuXg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tabler-icons/1.35.0/iconfont/tabler-icons.min.css" integrity="sha512-tpsEzNMLQS7w9imFSjbEOHdZav3/aObSESAL1y5jyJDoICFF2YwEdAHOPdOr1t+h8hTzar0flphxR76pd0V1zQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    ${links}
  </head>
  <body>
    ${scripts}
  </body>
</html>`;
}
