---
title: 有哪些注解可以注入 Bean？@Autowired 和 @Resource 的区别？
date: 2023-03-15 00:00:00
updated: 2023-03-15 00:00:00
description: 有哪些注解可以注入 Bean
categories: Java Learning
tags:
 - Java
 - Spring
---

* * *

### 有哪些注解可以注入 Bean？

- `@Autowired`：由Spring提供的注解。自动注入，按照类型自动装配，如果有多个同类型的Bean，则需要通过@Qualifier指定具体的Bean。

- `@Resource`：由JDK提供的注解，在Java 5中被引入。按照名称自动装配，默认是按照属性名称进行匹配，如果需要按照 Bean 的名称进行匹配，可以使用@Resource(name="beanName")。

- `@Inject`：由JSR-330提供，Java SE 6引入。和@Autowired类似，也是按照类型进行自动装配。

- `@Value`：由Spring提供的注解。用于注入配置文件中的属性值，可以指定默认值。

- `@Component`：由Spring提供的注解。用于声明一个Bean，作用类似于XML中的<bean>标签。

* * *

### @Autowired 和 @Resource 的区别？

`@Autowired`按照**类型自动装**配更为常用，而@Resource按照**名称自动装配**则比较适合需要明确指定Bean名称的情况。

```
public class UserService {

    // @Autowired 注解
    @Autowired
    private UserDao userDao;

    // @Resource 注解
    @Resource(name = "userDao")
    private UserDao userDao;
}
```

另外需要注意的是，`@Autowired` 注解默认情况下需要依赖对象存在，如果依赖对象为 null，则会抛出异常。而 `@Resource` 注解默认情况下不需要依赖对象存在，即依赖可以为 null，但可以通过 `required` 属性进行控制。

* * *

### @Autowired

在 Spring 中，`@Autowired` 注解用于自动装配 bean。其中，自动装配的类型是根据被注入的目标类型（Target Type）来确定的，也就是说，Spring 会查找和目标类型相同或者子类型的 bean 进行自动装配。具体来说，如果被注入的目标类型是一个接口或者一个抽象类，则 Spring 会查找实现该接口或抽象类的所有 bean 进行自动装配。如果目标类型是一个具体的类，则 Spring 只会查找该类型对应的 bean 进行自动装配。

```
public interface UserDao {
    // ...
}

@Service
public class UserDaoImpl implements UserDao {
    // ...
}

@Service
public class UserService {

    private final UserDao userDao;

    @Autowired
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    // ...
}
```

在上述代码中，`UserService` 类中的 `userDao` 字段使用了 `@Autowired` 注解进行了自动装配。由于 `userDao` 的类型是 `UserDao` 接口，因此 Spring 会查找所有实现了 `UserDao` 接口的 bean 进行自动装配。在这个例子中，`UserDaoImpl` 类实现了 `UserDao` 接口，因此 Spring 会将 `UserDaoImpl` 实例注入到 `UserService` 中。

注意，如果存在多个实现了 `UserDao` 接口的 bean，而没有明确指定要注入哪一个 bean，则 Spring 会抛出异常。在这种情况下，我们可以使用 `@Qualifier` 注解或者在 bean 定义时使用 `@Primary` 注解来指定要注入的 bean。

* * *

### @Resource

在 `@Resource` 注解中，`name` 属性指定了需要注入的 bean 的名称，而不是指定需要注入的类名。具体来说，如果 `name` 属性未指定，则默认采用字段名或者属性名作为 bean 的名称进行注入，例如：

```
public class UserService {

    @Resource
    private UserDao userDao;

    @Resource(name = "myUserDao")
    private UserDao userDao;

}
```

在上述代码中，`@Resource` 注解未指定 `name` 属性，因此默认使用了 `userDao` 作为需要注入的 bean 的名称。因此，Spring 将会查找名称为 `userDao` 的 bean 进行注入。

`name` 属性指定了 `myUserDao`，因此 Spring 将会查找名称为 `myUserDao` 的 bean 进行注入。注意，这里的名称应该是对应 bean 的名称，而不是对应类的名称。在 Spring 中，我们通常可以通过在 bean 的定义中使用 `id` 或者 `name` 属性来指定 bean 的名称。
