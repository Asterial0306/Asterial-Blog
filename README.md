# 星渊博客

星渊的个人网站

## 技术栈

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 3
- React Router DOM 7
- Lucide React

## 功能特性

- 📺 视频列表与详情页
- 📝 文章列表与详情页
- 👤 关于页面
- 📱 响应式设计
- 🎨 B站主题配色

## 项目结构

```
src/
├── components/              # 通用组件
│   ├── Icons/              # 自定义图标
│   │   ├── BilibiliIcon.tsx
│   │   ├── DouyinIcon.tsx
│   │   └── XiguaIcon.tsx
│   ├── Header.tsx          # 导航头部
│   ├── Footer.tsx          # 页脚
│   ├── VideoCard.tsx       # 视频卡片
│   ├── ArticleCard.tsx     # 文章卡片
│   ├── ProgressiveImage.tsx # 渐进式图片加载
│   ├── MarkdownRenderer.tsx # Markdown渲染器
│   ├── TableOfContents.tsx # 目录导航
│   ├── ErrorBoundary.tsx   # 错误边界
│   ├── LoadingSpinner.tsx  # 加载动画
│   └── BackToTop.tsx       # 回到顶部
├── pages/                  # 页面组件
│   ├── Home.tsx            # 首页
│   ├── Videos.tsx          # 视频列表
│   ├── VideoDetail.tsx     # 视频详情
│   ├── Articles.tsx        # 文章列表
│   ├── ArticleDetail.tsx   # 文章详情
│   └── About.tsx           # 关于页面
├── data/                   # 静态数据
│   ├── videos/             # 视频数据（按视频拆分）
│   │   ├── index.ts        # 视频数据汇总
│   │   ├── egg-pc-review.ts
│   │   └── workshop-blocks.ts
│   ├── articles.ts         # 文章数据
│   └── categories.ts       # 分类数据
├── config/                 # 配置文件
│   └── paths.ts            # 路径配置
└── types/                  # TypeScript类型定义
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 部署

项目通过 GitHub Actions 自动部署到 GitHub Pages。

部署地址：https://asterial0306.github.io/Asterial-Blog/

## 作者

星渊 - B站UP主

[B站空间](https://space.bilibili.com/645774959)
