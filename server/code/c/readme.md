# c

## window

-[MinGw](http://sourceforge.net/projects/mingw/files/)

        MinGw 是 Minimal GNU on Windows 的缩写，允许在 GNU/Linux 和 Windows 平台生成本地的 Windows 程序而不需要第三方运行时库

## Android

- [Termux 官网](https://termux.com/)

        termux是 可以在Android操作系统中模拟Linux环境的终端应用程序，可以直接安装在无root权限的安卓环境下。自动地安装了一个最小的基本系统——可以使用类似Debian系统阵营中的APT包管理器提供额外的软件包。

- [c4droid](play.google.com)

        c4droid是款Android设备上的C/C++程序编译器，默认以tcc(tiny c compiler)为编译器，可以选择安装gcc插件,

## gcc 进行 c 语言编译分为四个步骤：

1. 预处理，生成预编译文件（.i 文件）：`gcc –E hello.c –o hello.i`

2. 编译，生成汇编代码（.s 文件）：`gcc –S hello.i –o hello.s`

3. 汇编，生成目标文件（.o 文件）：`gcc –c hello.s –o hello.o`

4. 链接，生成可执行文件：`gcc hello.o –o hello`

## 内存分区：

- 栈（stack）：由编译器进行管理，自动分配和释放，存放函数调用过程中的各种参数、局部变量、返回值以及函数返回地址。操作方式类似数据结构中的栈。

- 堆（heap）：用于程序动态申请分配和释放空间。C语言中的malloc和free，C++中的new和delete均是在堆中进行的。正常情况下，程序员申请的空间在使用结束后应该释放，若程序员没有释放空间，则程序结束时系统自动回收。注意：这里的“堆”并不是数据结构中的“堆”。

- 全局（静态）存储区：分为DATA段和BSS段。DATA段（全局初始化区）存放初始化的全局变量和静态变量；BSS段（全局未初始化区）存放未初始化的全局变量和静态变量。程序运行结束时自动释放。其中BBS段在程序执行之前会被系统自动清0，所以未初始化的全局变量和静态变量在程序执行之前已经为0。

- 文字常量区：存放常量字符串。程序结束后由系统释放。

- 程序代码区：存放程序的二进制代码。