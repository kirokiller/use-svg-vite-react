# 图标

## web 端代码应用

### 使用 `<img>` 引入图片

```tsx
import zanIcon from "../../assets/icons/zan.svg";
...
<img src={zanIcon} className="icon-img" />
```

[支持的图像格式][svg]：APNG | AVIF | GIF | JPEG | PNG | SVG | WebP

### unicode & font-class 引用

@font-face 使用自定义字体 详情参考[原文][iconfont web端使用]

### symbol 引用

使用 symbol 定义图形模板对象，使用`<use>`实现元素实例化

```html
/** view-source:https://www.zhangxinxu.com/study/201407/svg-sprite.php */
<body>
  <div style="display: none;">
    <svg>
      <symbol id="liwu" viewBox="-80 -72.013 160 144.025">
        <path
          d="M-71.949-16.039h55.974v-55.974h-55.974V-16.039z M16.102-16.039h55.975v-55.974H16.102V-16.039z M-80,32.013h64.025v-40H-80V32.013z M80,32.013v-40H16.102v40H80z M-7.923,32.013H8.051V-72.013H-7.923V32.013z M16.102,39.936 h-32.077v24.025h32.077V39.936z M64.025,39.936h-40l15.719,32.077h24.281V39.936z M-23.898,39.936h-40v32.077H-40L-23.898,39.936z"
          transform="matrix(1 0 0 -1 0 0)"
        ></path>
      </symbol>
    </svg>
  </div>
  <h3>SVG Sprite使用示意</h3>
  <ul>
    <li>
      <svg class="webicon"><use xlink:href="#liwu" /></svg>兑换礼物
    </li>
  </ul>
</body>
```

通过引入 js 将 svg 资源插入 dom 中，建议阅读：[SVG 图标制作指南][SVG 图标制作指南] | [原文](https://fvsch.com/svg-icons)、[未来必热：SVG Sprites 技术介绍][未来必热：SVG Sprites 技术介绍]

> 注意：从绘图工具中导出的 SVG 经常带着一些不必要的内容和标签等（其中 d 下面包含了清晰的路径数据），可以使用工具比如 [SVGOMG][SVGOMG] ，然后比较一下处理前后哪些东西是移除或简化过的。
> 备注： 原本 SVGOMG 里面有一项配置 `transformsWithOnePath: true` ，由于这项配置会导致已经处理的 “干净” 的 SVG 图标报错，所以移除了该选项。此外为保留 viewBox，还移除了 `removeViewBox: true` 选项。[参考原文][SVG 图标制作指南]

使用 CSS 设置 svg 样式

> 在 iconfonticonfont.cn 上的资源可通过项目内的 批量操作-批量去色 来适配自定义颜色，默认下载的 iconfont 自带 icon class，直接使用时注意样式冲突（或手动移除 class 标签）。

通过其他设计平台下载的 svg 文件若要改变颜色样式，需将内部固定颜色替换成 currentColor

> 注意：因为克隆的节点是不可见的，所以当使用 CSS 样式化一个 use 元素以及它的隐藏的后代元素的时候，必须小心注意。隐藏的、克隆的 DOM 不能保证继承 CSS 属性，除非你显式设置使用 CSS 继承。[参考](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/use)

## vite 处理 svg 组件封装

1. 使用[vite-plugin-svg-icons][vite-plugin-svg-icons]插件。同 symbol 引用，使用 svgo 优化 svg 文件（无须手动处理啦！），在 main.ts 引入 virtual:svg-icons-register 脚本将 svg 资源注入 dom 。

```ts
export async function compilerIcon(
  file: string,
  symbolId: string,
  svgOptions: OptimizeOptions
): Promise<string | null> {
  if (!file) {
    return null;
  }

  let content = fs.readFileSync(file, "utf-8");

  if (svgOptions) {
    const { data } = (await optimize(content, svgOptions)) as OptimizedSvg;
    content = data || content;
  }

  // fix cannot change svg color  by  parent node problem
  content = content.replace(/stroke="[a-zA-Z#0-9]*"/, 'stroke="currentColor"');
  const svgSymbol = await new SVGCompiler().addSymbol({
    id: symbolId,
    content,
    path: file,
  });
  return svgSymbol.render();
}
```

> 备注：SvgIcon 组件封装建议使用 class 代替 color 传参设置样式，避免样式冲突。

2. 使用[vite-plugin-svgr][vite-plugin-svgr]插件。将 svg 文件转换为 jsx 组件使用，[在线转换][svg转jsx]

## 附录

- [iconfont 相关文章][iconfont 相关文章]
- [iconfont web 端使用][iconfont web端使用]
- [svg 介绍][svg]
- [SVG 图标制作指南][SVG 图标制作指南]
- [未来必热：SVG Sprites 技术介绍][未来必热：SVG Sprites 技术介绍]
- [SVGOMG][SVGOMG]
- [vite-plugin-svg-icons][vite-plugin-svg-icons]
- [vite-plugin-svgr][vite-plugin-svgr]

[iconfont 相关文章]: https://www.iconfont.cn/help/detail?spm=a313x.help_article_detail.i1.d5da6d815.31013a81atEoxA&helptype=article
[iconfont web端使用]: https://www.iconfont.cn/help/detail?spm=a313x.home_index.i3.28.50d33a81UVk7ZA&helptype=code
[svg]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#%E6%94%AF%E6%8C%81%E7%9A%84%E5%9B%BE%E5%83%8F%E6%A0%BC%E5%BC%8F
[SVG 图标制作指南]: https://zhuanlan.zhihu.com/p/20753791?spm=a313x.help_article_detail.i1.8.70a43a81EfaQoW&refer=FrontendMagazine
[未来必热：SVG Sprites 技术介绍]: http://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/?spm=a313x.help_detail.i1.15.4cf13a81mK9xus
[SVGOMG]: https://jakearchibald.github.io/svgomg/
[svg转jsx]: https://react-svgr.com/playground/
[vite-plugin-svg-icons]: https://github.com/vbenjs/vite-plugin-svg-icons
[vite-plugin-svgr]: https://github.com/pd4d10/vite-plugin-svgr
