## `let a = new A()` new 的意义

    //创建空对象
    var o = new Object();
    //原型继承
    o.__proto__ = A.prototype
    //更改构造器函数内部this，将其指向新创建的空对象
    A.call(o)

> new 通过构造函数 Test 创建出来的实例可以访问到构造函数中的属性

> new 通过构造函数 Test 创建出来的实例可以访问到构造函数原型链中的属性，也就是说通过 

> new 操作符，实例与构造函数通过原型链连接了起来

构造函数如果返回原始值（虽然例子中只有返回了 1，但是你可以试试其他的原始值，结果还是一样的），那么这个返回值毫无意义

构造函数如果返回值为对象，那么这个返回值会被正常使用， 返回对象会导致 new 操作符失去意义 默认返回this

## 实现 new 操作符

function create(Con, ...args) {
  let obj = {}
  // obj.__proto__ = Con.prototype
  Object.setPrototypeOf(obj, Con.prototype)
  //改变this指向， 将参数传入构造函数
  let result = Con.apply(obj, args)
  //检查 result 的值是否为对象
  return result instanceof Object ? result : obj
}

## new 的意义

- 继承
- 实例化
