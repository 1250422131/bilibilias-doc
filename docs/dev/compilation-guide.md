# 编译指南

## 构建签名准备

如果你是非专业开发人员，可直接按照这个流程自动构建项目，BILIBILIAS已经支持了GitHub流水线（Action）编译。

### 注册GitHub

BILIBILIAS 源代码在 [GitHub](https://github.com) 发布，因此在开始之前，你需要确保自己已经注册了这个平台的账户，如果你还没有注册账户请点击：[Github 注册](https://github.com/join) 。

### Fork 仓库

BILIBILIAS的主仓库已经归档并且停止维护，因此你需要自行Fork一份代码仓库。

1. 访问 [BILIBILIAS 仓库](https://github.com/1250422131/bilibilias)
2. 点击右上角的 **Fork** 按钮
3. 在弹出窗口中点击 **Create fork**

<AsImage src="https://githubdocs.cn/assets/cb-34352/mw-1440/images/help/repository/fork-button.webp"></AsImage>


等待 fork 完成后，你会被重定向到你自己的仓库副本：`https://github.com/用户名/bilibilias`,之后的操作将从你自己 Fork 的仓库开始。

你也可以参考： [Github Fork 代码库](https://githubdocs.cn/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)

---

### 生成签名密钥

尽管BILIBILAIS已经支持了自动化构建，但你仍然需要创建自己的数字签名，用来编译 Release 版本的 APK 需要数字签名，安卓要求所有安装的安装包必须进行签名。

#### 使用在线工具生成

::: warning
注意，这里生成的签名有可能并不安全，请不要用作其他用途，下面推荐的平台也并非我们自己的平台，而是目前可以无代码创建签名的平台。
:::

最简单的方式是使用在线工具：

1. 访问 [Androidacy Keystore Generator](https://www.freewebsitetoapp.com/create-keystore-file/)

2. 点击页面按钮 **Create Keystore File**

3. 填写签名信息

<AsImage   src="/images/dev/compilation-guide/create_jks_1.png"></AsImage>

这里需要注意几个地方，你必须记住它，我们后面将用到。

- Keystore Password (签名密码)
- Alias Name （签名别名）
- Alias Password （别名密码）
- Email （电子邮箱）

其他不需要完全按照图上的，你可以随便填写，但别写错`邮箱`这很关键。

4. 下一步完成验证

<AsImage src="/images/dev/compilation-guide/create_jks_2.png"></AsImage>

这里你需要完成人机验证并且勾选隐私政策。

5. 等等接收邮箱

这需要一点时间，大概是1分钟，你可以关注你的邮箱，邮件内附带了一个附件： `keystore.jks`，你需要下载它，我们之后将会用到。

### 密钥文件转换 Base64

我们的自动构建依赖 GitHub，而构建过程需要我们刚刚的签名和签名信息，但我们并不能直接上传文件，这是不可行的，所以我们需要把文件转化为**base64** 。

你可以在这个网站完成操作： [文件转Base64](https://www.lddgo.net/convert/filebasesix)

你需要上传刚刚邮件中的 `keystore.jks` 上传完成后下面会自动输出 base64，注意下面只是例子，base64 每个文件都不同：

```
/u3+7QAAAAIAAAABAAAAAQAEdG
VzdAAAAZw3dyj5AAAFATCCBP0w
...........................
.........................==
```

### 填写Action机密

现在，我们要为我们的流水线填写机密变量，这个变量填写后只有你和仓库所有者自己看得见。

1. 打开Fork仓库
2. 切换到仓库的Setting
3. 点击 Secrets and variables 下的 Action

<AsImage src="/images/dev/compilation-guide/create_repository_secrets_1.png"></AsImage>

4. 创建机密

现在就需要用到我们前面创建密钥时填写的内容了，我们需要创建一下几个机密变量：

<AsImage src="/images/dev/compilation-guide/create_repository_secrets_2.png"></AsImage>

- `ALPHA_KEYSTORE_BASE64` (刚刚我们转换的签名Base64)
- `ALPHA_KEYSTORE_PASSWORD` （签名密码）
- `ALPHA_KEY_ALIAS` （签名别名）
- `ALPHA_KEY_PASSWORD` （别名密码）

## Action自动构建

BILIBILIAS 已经完成流水线脚本，你可以在 **.github/workflows** 文件中看到 `build-apk-alpha.yml`，流水线代码，运行流水线，Github将自动构建产物。

### 手动触发构建

1. 切换到 **Fork仓库** 的 `Action`。
2. 然后选 `Build and Upload Compose APK (Alpha)`。
3. 在左侧有`Run workflow`，点击。
4. 点击 `Run workflow` 后弹出的 `run` 按钮。
   具体如下图：
   <AsImage src="/images/dev/compilation-guide/action_run_1.png"></AsImage>
   但有可能新用户的Action页面提示启用，你需要按照正常流程授权启用即可。

### 查看构建进度

现在，你可以切换到 `All` 标签下，就可以看到刚刚运行的流水线了，黄色则代表还在运行，点击可查看具体进展，这大致需要12分钟。
<AsImage src="/images/dev/compilation-guide/check_action_1.png"></AsImage>

## 下载Action构建产物

<AsImage src="/images/dev/compilation-guide/check_action_2.png"></AsImage>

如图，当你发现 Action 执行变为绿色后就代表构建结束且成功了，如果是红色则代表失败，这时可检查是否是某个签名信息写错了。

现在，我们将页面滚到最底部就可以看到构建产物了，这里产物有四个，分别对应着3个不同的手机架构和全部的架构安装包。

<AsImage src="/images/dev/compilation-guide/download_action_result.png"></AsImage>

你可以点击旁边的下载按钮。

如果你的设备不是非常非常老，可以直接下载`APK-alpha-arm64-v8a`，这是目前最主流的系统架构，也就是arm架构。

如果你发现`APK-alpha-arm64-v8a`无法在你的设备打开或者安装运行，就尝试其他架构，但如果你不行这么麻烦，可直接下载`APK-alpha-universal`，这里有所有的架构。
