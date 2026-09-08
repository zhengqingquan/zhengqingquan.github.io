---
title: Python的应用程序打包方式——PyInstaller
date: 2022-04-07 15:06:12
updated: 2022-04-08 08:49:39
description: Python的应用程序打包方式——PyInstaller PyInstaller并不是一个Python的原生模块，因此需要自己下载
categories: Python Learning
tags:
 - Python
---
## ##Python的应用程序打包方式——PyInstaller

PyInstaller并不是一个Python的原生模块，因此需要自己下载。可以使用pip的方式在线下载或自行下载.whl文件离线安装PyInstaller模块。

但无论是那种方式，在准备好打包环境后才正式开始阅读这篇文章。

* * *

当你拥有一个Python项目，你想把你的项目打包成一个.exe的运行程序。这样你就可以直接其他人的电脑上运行，无需安装Python解释器，也无需进行编译。

打包的过程结束后，可能会出现几个东西，分别是：\_\_pycache\_\_文件夹、build文件夹、dist文件夹和一个单独的.spec文件。

- \_\_pycache\_\_文件夹，名称很直白，Python Cache，也就是Python缓存的意思。这个文件会出现在你项目自身的目录里。Python解释器会将\* .py 脚本文件进行编译，并将结果保存到\_\_pycache\_\_目录中。下次运行工程时，若解释器发现这个.py 脚本没有修改过，就会跳过编译这文件，直接运行以前生成的保存在\_\_pycache\_\_的.pyc 文件。这对于大型工程是有好处的，可以大大缩短项目运行前的准备时间。如果不想暴露源码也可以使用.pyc 文件文件。但这个文件夹本身不属于PyInstaller产生的，而是Python解释器产生的。
- build文件夹，是PyInstaller在打包程序时产生的临时文件夹。
- dist文件夹，是PyInstaller打包出来的可执行文件目录。打包完成后的程序会放在该目录中。一般有两种方式，一种方式是生成目录，另一种方式是生成单一的.exe应用程序。
- .spec文件，是PyInstaller为打包而准备的配置文件。就像一份清单一样，你想指定你的项目如何打包，打包成什么样。例如是否使用图标、项目使用的资源文件在哪、如何指定项目依赖等等。这些都可以先写入.spec文件中，之后使用PyInstaller的命令，根据.spec里的内容将你的项目打包成你想要的应用程序。似于cmake的.makefile文件，都是用于控制编译构建过程的配置文件。

* * *

| \-h，--help | 查看PyInstaller的帮助信息。 |
| --- | --- |
| \-F，-onefile | 生成单个的可执行文件。 |
| \-D，--onedir | 生成一个目录（包含多个文件）作为可执行程序，这也是默认方式。 |
| \-o DIR，--out=DIR | 指定.spec文件生成的目录。如果没有指定，则默认在当前目录生成.spec 文件 |
| \-n NAME，--name=NAME | 指定项目（产生的.spec）名字。如果省略该选项，那么第一个脚本的主文件名将作为.spec的名字。 |
| \-w，--windowed，--noconsolc | 指定程序运行时不显示命令行窗口（仅对 Windows 有效）。 |

将项目打包成单一可执行文件和文件夹有什么区别么？

- 单一可执行文件比文件夹的启动时间要长。因为当程序运行时，单一的可执行文件需要解压程序的第三方依赖文件到临时文件夹中。
- 单一可执行文件的文件结构和工程目录是一样的。但是生成文件夹就不一样了，若程序中包含相对路径，这个相对路径是文件夹目录的，这点需要注意。

有更多问题可以在PyInstaller的wiki中查看：[https://github.com/pyinstaller/pyinstaller](https://github.com/pyinstaller/pyinstaller)
