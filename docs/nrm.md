## 		nrm —— npm registry 管理插件



### 1. 安装

```bash
npm install -g nrm
```

### 2. 使用

```bash
$ nrm -h
Usage: cli [options] [command]

Options:
  -V, --version                           output the version number
  -h, --help                              output usage information

Commands:
  ls                                      List all the registries // 查看仓库列表
  current                                 Show current registry name // 查看当前仓库名
  use <registry>                          Change registry to registry // 切换仓库地址
  add <registry> <url> [home]             Add one custom registry // 添加新仓库
  set-auth <registry> <value> [always]    Set authorize information for a custom registry // 设置自定义仓库作者
  set-email <registry> <value>            Set email for a custom registry // 设置自定义仓库邮箱
  set-hosted-repo <registry> <value>      Set hosted npm repository for a custom registry to publish packages // 设置发布包仓库地址
  del <registry>                          Delete one custom registry // 删除仓库地址
  home <registry> [browser]               Open the homepage of registry with optional browser // 浏览器打开仓库首页
  publish [options] [<tarball>|<folder>]  Publish package to current registry if current registry is a custom registry.
   if you're not using custom registry, this command will run npm publish directly // 发布npm包至自定义仓库
  test [registry]                         Show response time for specific or all registries // 查看连接仓库响应时间
  help                                    Print this help
```



### 3. 示例

查看所有registry

```bash
$ nrm ls

  npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
* taobao - https://registry.npm.taobao.org/  // 当前仓库
  nj ----- https://registry.nodejitsu.com/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
```

切换registry

```bash
$ nrm use npm


   Registry has been set to: https://registry.npmjs.org/

```

添加自定义registry

```bash
$ nrm add local http://192.168.1.156/

    add registry local success

```

