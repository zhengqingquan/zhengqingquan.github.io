---
title: 打好基础——Servlet——Server
date: 2023-06-21 08:54:18
updated: 2023-06-21 08:54:19
description: 在Servlet的生命周期中，客户端的请求会被转化为一个 ServletRequest 对象和一个 ServletResponse 对象，然后这两个对象会作为参数被传入到 service 方法中
categories: Java Learning
tags:
 - Java
 - Servlet
---
在Servlet的生命周期中，客户端的请求会被转化为一个`ServletRequest`对象和一个`ServletResponse`对象，然后这两个对象会作为参数被传入到`service()`方法中。

`service()`方法会根据HTTP请求的类型（GET，POST，PUT，DELETE等）调用相应的方法（`doGet()`, `doPost()`, `doPut()`, `doDelete()`等）。

`ServletRequest`和`ServletResponse`是接口，而`HttpServletRequest`和`HttpServletResponse`是这两个接口的实现，它们提供了处理HTTP请求的额外方法，比如获取HTTP头，cookies，session等。

`service(ServletRequest req, ServletResponse res)`是`javax.servlet.Servlet`接口的一部分，所有Servlet都必须实现这个接口。

而`service(HttpServletRequest req, HttpServletResponse resp)`是HttpServlet类的一个方法，这个方法会根据请求的类型调用`doGet()`, `doPost()`, `doPut()`, `doDelete()`等方法。

当这两个方法同时存在时，会首先执行`service(ServletRequest req, ServletResponse res)`。这个方法会将ServletRequest和ServletResponse对象转型为HttpServletRequest和HttpServletResponse对象，然后调用`service(HttpServletRequest req, HttpServletResponse resp)`。

* * *

当客户端的请求来到Servlet容器，容器会首先调用`service(ServletRequest req, ServletResponse res)`，这个方法再调用`service(HttpServletRequest req, HttpServletResponse resp)`。

* * *
