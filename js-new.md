let a = new A()

//创建空对象
var o = new Object();
//原型继承
o.__proto__ = A.prototype
//更改构造器函数内部this，将其指向新创建的空对象
A.call(o)
