学习笔记

###语言分类
####形式语言——用途：
1.数据描述语言：
JSON、HTML、SQL、CSS、Dart
2.编程语言：
C、C++、Java、C#、JavaScript、Objective-C、Swift、PHP、Ruby、Python、Golang、TypeScript

####形式语言——表达方式：
1.声明式语言（结果是怎么样的）：
JSON、HTML、SQL、CSS、Dart（大部分数据描述语言为声明式语言）
2.命令型语言（达成结果的每个步骤是怎么样的）：
C、C++、Java、C#、JavaScript、Objective-C、Swift、PHP、Ruby、Python、Golang、TypeScript


###语言分类
####形式语言——用途：
1.数据描述语言：
JSON、HTML、SQL、CSS、Dart
2.编程语言：
C、C++、Java、C#、JavaScript、Objective-C、Swift、PHP、Ruby、Python、Golang、TypeScript

####形式语言——表达方式：
1.声明式语言（结果是怎么样的）：
JSON、HTML、SQL、CSS、Dart（大部分数据描述语言为声明式语言）
2.命令型语言（达成结果的每个步骤是怎么样的）：
C、C++、Java、C#、JavaScript、Objective-C、Swift、PHP、Ruby、Python、Golang、TypeScript


###JS基本类型
1. String
	1. Character
		1. 字符串中的一个字符，计算机通过Code Point 用来表示 Character
	2. Code Point
		1. Code Point 是一个数字，譬如97代表 a
			1. 存储 - 英文：一个字符存一个字节
			2. 存储 - 中文：因为汉字数量太多，一个字符存不了，要用多个字节存储
			3. 不同的语言有不同的编码方式
	3. Encoding
		1. ASCCII
			1. 一个字节代表一个字符
			2. 共127个，0到127
		2. Unicode
			1. 全世界的语言编码集，不同国家分不同片区
		3. Unicode和另一个组织合并的时候产生的
			1. 范围是0000-FFFF
		4. GB（国标，比Unicode省空间）
			1. GB2312，第一个版本
			2. GBK（GB13000），国标扩展
			3. GB18030，补上了所有字符
		5. ISO-8859
		6. BIG5，台湾使用
	2. Enconding
		1. UTF 8
			1. 默认一个字节一个字符
			2. 控制位，第一个字节前面有多少个1就表示码点有多少个字节
			3. 后面的字节以10开始
		2. UTF 16
			1. 两个字节一个编码
			2. ASCII，在第一个字节补0
2. Nubmer
	1. IEEE 754 Double Float（浮点数）
		1. Sign（1个符号位）
		2. Exponent（11位指数位，能表示的范围）
		3. Fraction（52位有效位数，能表示的精度）
	2. 表示有效位数的小数
	3. 表示有理数
3. Boolean
4. Object
5. Null
	1.  有值但为空
	2. typeof 为 object
6. Undefined
	1. 没有赋值
7. Symbol
	1. object的属性名

