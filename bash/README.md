改文件夹内存放的全部是所有的docker构建命令的执行脚本。在开始使用前，请在`deploy`目录中，修改好各个环境的构建配置。

命令使用方式如下：在项目根目录下执行(可能在执行之前需要添加可执行权限)
```bash
# tag_name为镜像tag名称，tag_version镜像tag版本号
./bash/xxx.sh tag_name tag_version
```
