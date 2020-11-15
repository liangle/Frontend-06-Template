#学习笔记

###计算机分析代码过程：
1.编程语言分词；
2.把词构建成层层嵌套的语法树。构建过程叫语法分析，语法分析有两种：LL、LR，LL是Left Left算法的简写，从左到右扫描，从左到右归约。
3.解析代码执行；

##使用LL算法构建AST（AST为抽象语法树）
###四则运算：
1.TokenNumber：1234567890
2.Operator：+、-、*、/
3.Whitespace：<SP>
4.LineTerminator：<LF><CR>

###四则运算产生式：

	<Expression> ::=
		<AdditiveExpression><EOF>

	<AdditiveExpression> ::=
		<MultiplicativeExpression>
		| <AdditiveExpression><+><MultiplicativeExpression>
		| <AdditiveExpression><-><MultiplicativeExpression>

	<MultiplicativeExpression> ::=
		<Number>
		| <MultiplicativeExpression><*><Number>
		| <MultiplicativeExpression></><Number>


###[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions "正则表达式")
	let regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g;
	let dictionary = ["Number", "Whitespace", "LineTerminator", "+", "-", "*", "/"];

1.正则表达式的括号代表捕获；
2.每次捕获都只会捕获一个分支，分支用|分隔；
3.通过exec扫描` let result = regexp.exec(source);`，扫描结果数组中包含所有分支，匹配到的分支有值。通过匹配到的分支索引号可以从 dictionary 获取分支名字；

###词法分析
正则表达式扫描 `1024 + 10 * 25` 顺序：

1.第一次扫描到 Number 1024；
2.第二次扫描到 Whitespace 空格；
3.第三次扫描到+；
4.第四次扫描到 Whitespace 空格；
5.第五次扫描到 Number 10；
6.第六次扫描到 Whitespace 空格；
7.第七次扫描到*；
8.第八次扫描到 Whitespace 空格；
9.第九次扫描到 Number 25；

如果需要返回序列可以使用 yield ；

###语法分析
1.每个产生式对应一个函数；
2.MultiplicativeExpression：第一个输入是Number或者MultiplicativeExpression，第二个输入为*或者/。第一个输入为 Number 时，创建一个 MultiplicativeExpression 类型的 node，children 为自己，替换 source 第一个输入。第一个输入为 MultiplicativeExpression 时，创建一个 MultiplicativeExpression 类型的 node，children 为 source 前三项，source 插入 node;
3.AdditiveExpression：第一个输入是 Number，所以第一次需要执行 MultiplicativeExpression。执行 + 、 - 时的第三项是 Number 也需要执行一次 MultiplicativeExpression。
