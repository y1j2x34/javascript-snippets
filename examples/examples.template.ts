import { makeHtmlAttributes, RollupHtmlTemplateOptions } from '@rollup/plugin-html';

export function templateCreator(code: string) {
    return function template(options?: RollupHtmlTemplateOptions) {
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
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/rainbow.min.css" integrity="sha512-ohxc5OnaYpC+nn8t5pH3F9Fx4xjwE7bnFDN7qX3GWWIK70+ivPEYQejZQOV96YmurTP5IaqmxyFnXDIEHg7Vhw==" crossorigin="anonymous" referrerpolicy="no-referrer" /> 
        ${links}
      </head>
      <body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" integrity="sha512-D9gUyxqja7hBtkWpPWGt9wfbfaMGVt9gnyCvYa+jojwwPHLCzUm5i8rpk7vD7wNee9bA35eYIjobYPaQuKS1MQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/typescript.min.js" integrity="sha512-GsPn8jZedZaPLThVdRVJ9kvS02HmLZBsoC9qon3IZE8Al7pUBlDIK4IzAtMbxtZ2GtLMFhHusOLTwf2JIDr0oA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        ${scripts}
        <pre><code class="language-javascript">${code}</code></pre>
        <script>hljs.highlightAll();</script>
      </body>
    </html>`;
    };
}
