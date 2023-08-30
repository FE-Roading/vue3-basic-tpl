正常项目开发过程中，一般都是先构建一个基础镜像(`npm install`所有的依赖)，再在基础镜像的基础上构建出各个环境的dist镜像（`build`之后的`dist`内容放置到`nginx`服务器上）。线上运行时是使用的dist镜像。

```markdown
deploy
├── base.dockerfile  构建基础镜像
├── build.dockerfile  直接构建dist镜像（不使用基础镜像）
├── dev.dockerfile  构建开发环境的dist镜像。需修改基础镜像名称和构建命令
├── dist.dockerfile  直接引用本地的dist目录构建一个dist镜像
├── nginx.conf  nginx服务器配置
└── prod.dockerfile  构建生成环境的dist镜像。需修改基础镜像名称和构建命令
```