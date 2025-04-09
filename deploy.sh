#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 获取远程仓库地址
push_addr=`git remote get-url --push origin`
# 获取当前提交信息
commit_info=`git describe --all --always --long`
# 打包生成的文件夹路径
dist_path=docs/.vuepress/dist
# 推送的目标分支
push_branch=gh-pages

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd $dist_path

# 初始化 Git 仓库
git init
# 添加所有文件到暂存区
git add -A
# 提交更改
git commit -m "deploy $commit_info"
# 强制推送到指定分支
git push -f $push_addr HEAD:$push_branch
# 返回上级目录
cd -
# 删除打包文件
rm -rf $dist_path