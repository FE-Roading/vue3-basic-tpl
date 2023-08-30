#!/bin/bash  

# 镜像的tag和version
image_tag_name="vue3-project-build"
if [ $1 ];then
  image_tag_name=$1
fi
image_tag_version=`date +%Y%m%d%H%M`
if [ $2 ];then
  image_tag_version=$2
fi

# 开始构建
docker build . -f ./deploy/dev.dockerfile -t $image_tag_name:$image_tag_version

echo "构建完成😃，镜像版本为$image_tag_name:$image_tag_version"