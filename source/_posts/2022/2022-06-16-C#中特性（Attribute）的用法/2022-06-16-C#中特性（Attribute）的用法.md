---
title: "C#中特性（Attribute）的用法。"
date: 2022-06-16 08:45:14
updated: 2022-06-16 08:45:14
description: \ C 中特性（Attribute）的用法
categories: C Learning
tags:
 - C
permalink: posts/efdde52be659.html
---
### \### C#中特性（Attribute）的用法。

特性其实类似于修饰器，在方法执行的前后可以额外执行其他的代码，而不需要主动去做额外的设计。

其用法其实就是在类或方法前加上\[Attribute()\]。

```
using System; 
public class AnyClass
{
    [Obsolete("Don't use Old method, use New method", true)]
    static void Old() { }

    static void New() { }

    public static void Main()
    {
        Old();
    }
}
```

上面这个例子，在这个例子中我们使用了Obsolete特性，它标记了一个不应该再被使用的程序实体。

第一个参数是一个字符串，它解释了 为什么该实体是过时的以及应该用什么实体来代替它。实际上，你可以在这里写任何文本。第二个参数告诉编译器应该把使用这个过时的程序实体当作一种错误。它的默认值是false，也就是说编译器对此会产生一个警告。

当我们尝试编译上面这段程序的时候，我们将会得到一个错误：

```
AnyClass.Old()' is obsolete: 'Don't use Old method, use New method'
```

我们也可以自己实现特性。首先要从System.Attribute派生出我们自己的特性类（一个从System.Attribute抽象类继承而来的类，不管是直接还是间接继承，都会成为一个特性类。特性类的声明定义了一种可以被放置在声明之上新的特性）。

```
using System; 
public class HelpAttribute : Attribute
{

}

[Help()]
public class AnyClass
{

}
```

注意：对一个特性类名使用Attribute后缀是一个惯例。当我们把特性添加到一个程序实体，是否包括Attribute后缀是我们的自由。编译器会首先在System.Attribute的派生类中查找被添加的特性类。如果没有找到，那么编译器会添加Attribute后缀继续查找。

接下来把上面的特性添加到具体的程序实体中。

```
using System; 
public class HelpAttribute : Attribute
{
    public HelpAttribute(String Descrition_in)
    {
        this.description = Description_in;
    }
    protected String description;
    public String Description
    {
        get
        {
            return this.description;

        }
    }
}

[Help("this is a do-nothing class")]
public class AnyClass
{

}
```

在这个例子中，我们给HelpAttribute特性类添加了一个属性并且在后续的部分中会在运行时环境中查寻它。
