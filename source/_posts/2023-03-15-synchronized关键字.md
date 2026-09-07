---
title: synchronized关键字。
date: 2023-03-15 00:00:00
updated: 2023-03-15 00:00:00
description: 为什么需要synchronized关键字
categories: Java Learning
tags:
 - Java
---

### 为什么需要synchronized关键字？

在多线程环境下，如果多个线程同时访问一个共享资源，就会出现多个线程同时修改这个资源的情况，从而导致数据不一致等问题。

`线程同步`指的是多个线程在访问共享资源时保持数据一致性的过程。

`并发安全`指的是在多线程并发访问下，程序能够正确、稳定地运行，并且不会出现数据竞争、数据不一致等问题。

但无论是`线程同步`、`并发安全`、还是`线程安全`等类似的词语，都是为了在多线程环境下保持数据的一致性，并保证程序按照预期的结果执行。

* * *

### synchronized如何解决这个情况？

`synchronized`是一个用于解决并发安全的修饰关键字。它保证了多线程环境下数据操作的**原子性**。

具体来说。使用`synchronized`可以保证**同一时刻只有一个线程访问该资源**，其他线程需要等待当前线程执行完毕后才能访问，从而避免了线程不安全的问题。

`synchronized`可以修饰在方法或代码块上。方法细分的话可以分为普通方法和静态方法。

- **修饰普通方法**：锁的对象是调用这个方法的对象。一个对象用一把锁。

- **修饰静态方法**：锁对象是当前类对象。类的所有对象公用一把锁。

- **修饰代码块**：锁对象是括号里指定的对象。尽量不要使用 synchronized(String a) 。

尽量不要使用synchronized(String a)的原因是，`String`对象是不可变的（immutable），也就是说，一旦创建了一个`String`对象，其值就不会再发生改变。而在Java中，字符串常量（如"abc"）是被共享的，也就是说，多个变量可以引用同一个字符串常量。

当使用`synchronized`关键字来同步访问一个字符串常量时，实际上是在同步访问该字符串常量所对应的字符串池（string pool）中的对象。由于字符串常量是不可变的，因此在字符串池中的字符串对象可能会被其他代码（如`String.intern()`方法）引用，从而导致其他代码也受到了同步访问的影响，这可能会导致意想不到的问题。

因此，尽量不要使用`synchronized(String a)`来同步访问字符串常量，而应该使用其他对象来作为锁，例如自定义的对象或Class对象。

* * *

### 如何使用synchronized？

**修饰方法**：在方法声明中添加`synchronized`关键字，使得整个方法在执行时都会获取对象的锁。

```
public class Counter {
    private int count;

    public synchronized void increment() {
        count++;
    }

    public synchronized void decrement() {
        count--;
    }

    public synchronized int getCount() {
        return count;
    }
}
```

如果一个对象有多个`synchronize`方法，一个线程访问了这个对象的一个`synchronize`方法，其他线程就不能访问这个对象的任何一个`synchronize`方法。

多个不同实例对象的 synchronize 方法之间没有关系

**修饰静态方**法：下面是一个使用`synchronized`修饰静态方法的例子：

```
public class Counter {
    private static int count;
    
    public static synchronized void increment() {
        count++;
    }

    public static synchronized void decrement() {
        count--;
    }

    public static synchronized int getCount() {
        return count;
    }
}
```

**修饰代码块**：使用`synchronized`关键字修饰一个代码块，可以使用以下方式：

```
public class Counter {
    private int count;
    private final Object lock = new Object();

    public void increment() {
        synchronized (lock) {
            count++;
        }
    }

    public void decrement() {
        synchronized (lock) {
            count--;
        }
    }

    public int getCount() {
        synchronized (lock) {
            return count;
        }
    }
}
```

* * *

### synchronized做了什么？

`synchronized`保证了**原子性**、**可见性**和**有序性**，即保证在同一个锁上，一个线程修改了共享变量的值之后，另一个线程能够立即看到修改后的值，并且在多个线程执行顺序上保证了一致性。

**防止指令重排序**，保证代码执行的顺序和预期一致。

**实现线程间的通信**，虽然`synchronized`没法直接作用于线程通信，但可以实现线程间的协调和同步，从而达到线程间的通信的效果。

例如，在生产者-消费者模型中，生产者线程负责生产数据，消费者线程负责消费数据，它们需要进行协调和同步。可以使用`synchronized`关键字来保证生产者和消费者线程在对共享数据进行读写时的互斥，从而防止出现数据竞争的问题。另外，可以使用`wait()`、`notify()`、`notifyAll()`等方法来实现线程间的等待、通知和唤醒操作，从而实现线程间的协调和同步。

### synchronized会带来什么？

一种技术的引用会带来好处也会带来弊端。

 `synchronized`会带来一定的性能损失，因为每次进入同步块时都需要获得锁，这会增加线程的等待时间和上下文切换的开销。

同时，如果同步块的代码执行时间很短，也会增加不必要的性能开销。因此，需要根据具体情况来判断是否需要使用`synchronized`。

* * *

### synchronized还有哪些问题？

`synchronized`和其他同步工具（如 ReentrantLock）相比，有以下优缺点：

- 优点：简单易用，不需要手动释放锁。

- 缺点：不灵活，不能设置超时时间、中断等；效率低，每次都要进入内核态获取锁；不可重入，同一个线程在获取到锁后还要再次获取锁会造成死锁。
