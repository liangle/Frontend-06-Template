# 重学前端（二）

### 表达式

1. 运算符
2. 表达式
3. 类型转换
	1. a + b
	 1. 除字符串和数字外相加会发生类型转化
	 2. 字符串 + 数字时，数字先转成字符串
	2. "false" == false，先转Number再比较
	3. Unboxing（拆箱转换）
		1. 把一个Object转换成一个基本类型叫拆箱，主要过程是ToPremitive
		2. 两个对象相加时会调用ToPremitive
		3. 影响ToPremitive的3个方法
			1. toString()， 当通过属性名访问时调用toString
			2. valueOf()，加法时先调用valueOf，转Number时一定先转valueOf
			3.  [Symbol.toPrimitive]()，如果定义了toPrimitive会忽略toString和valueOf
	4. Boxing（装箱转换）
		1. JS为部分基本类型提供了包装类
			1. Number，Number构造器
				- new Number调用，返回一个对象
				- Number调用，返回一直值
			2. String，new String()
			3. Boolean，new Boolean(true)
			4.Symbol，new Object(Symbol("a"))，值Symbol（"a"）

## 语句

### 运行时
1. Completion Record
	记录语句的完成状态
	结构
		type：normal、break、continue、throw
		value：基本类型
		target：abel

	2.Lexical environment

### 简单语句

	ExpressionStatement
	EmptyStatement
	DubuggerStatement
	ThrowStatement
	CountinueStatement
	BreakStatement
	ReturnStatement

### 复合语句

	BlockStatement，type:normal
	IfStatement
	SwitchStatement，c++中比js性能好，js里和if没区别
	IterationStatement，let 声明的域 for语句会产生独立的作用域，type: break 、continue，target:label
	WithStatement
	LabeledStatement，多层循环时可以调到指定的label循环
	TryStatement，type:return，target:label，try 里return了finally还是会执行

### 声明

	FunctionDeclaration，function，作用范围是Function Body
	GeneratorDeclaration，function *
	AsyncFunctionDeclaration，async function
	AsyncGeneratorDeclaration，async function *
	VariableStatement，var，作用范围是Function Body
	ClassDeclaration，class，声明之前使用会报错
	LexicalDeclaration， const 、let，声明之前使用会报错

#### 预处理
一段代码执行前JavaScript引擎会对代码本身做一次预先处理，预处理会提前找到var的声明，并让它生效，把它声明到函数作用域级别，在return后面也一样。所以的声明都有预处理机制，都可以把变量处理成局部变量，区别是const在声明前使用时会抛错。

#### 作用域

##### 代码作用范围
	var，函数体内
	const，花括号里

## 结构化

####  宏观任务
	- 传给JavaScript引擎的任务
#### 微观任务（Promise）
	- JavaScript内部执行的任务
	- 只有Promise会产生微任务
	- then后面的语句都会异步执行
	- 把多个微任务给JavaScript引擎并且执行的过程叫作宏任务

#### 事件循环
	获取代码 - 执行代码 - 等待

### 函数调用
	函数调用会形成栈
	执行一条语句时的所有信息都会保存在Execution Context里面
	数据结构为Execution Context Stack
	执行到当前语句时有一个栈顶元素，栈顶元素就是能访问的所有变量，Running Execution Context

#### Execution Context
	code evaluation state
	Function
	Script or Module
	Generator
	Realm
	LexicalEnvironment，this、new.target、super、变量
	VariableEnvironment

#### Environment Records
	Declarative Environment Records
	Function Environment Records
	Module Environment Records
	Global Environment Records
	Object Environment Records

#### 闭包
	JavaScript 每个函数都会生成闭包
	闭包分成两个部分
	代码
	环境，1、由一个Object和一个序列组成，2、每个函数都会带一个定义时的Environment，保存为自己的一个属性

#### Realm
	JavaScript的引擎实例里面所有内置对象都会放进一个Realm里面
