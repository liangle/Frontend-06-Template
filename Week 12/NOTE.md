重学CSS

### 一、盒
>HTML代码中可以书写开始标签，结束标签，和自封闭标签。一对起止标签，表示一个元素。DOM树中存储的是元素和其它类型的节点（Node）。CSS选择器选中的是元素。CSS选择器选中的元素，在排版时可能产生多个盒。排版和渲染的基本单位是盒。

盒模型：

- content
- padding：内边距
- border
- margin：外边距，周围至少要有多少空间，多个盒之间可能发生margin折叠。

box-sizing

- content-box：width属性只包含content的内容，盒排版占用的区块的尺寸 = content-box + padding + border + margin。

- border-box：width包含了margin和border的值。

>如果两个子div的width=50%，box-sizing=border-box时不会换行，content-box时会换行。

### 二、正常流
CSS排版只包含两样东西，一个是盒一个是文字；

正常流排版：

- 收集盒进行；
- 计算盒在行中的排布；
- 计算行的排布；

line-box：行盒，由inline-level-box组成。行内格式化上下文IFC，inline-level-formatting-context

block-level-box：块级盒，单独占一行。块极格式化上下文BFC，block-level-formatting-context

正常流的块级排布

- float 会先排进行，再调整行盒的位置，float会影响行盒的尺寸；
- clear 找一个干净的空间来执行浮动；
- 通过给每个元素增加float属性可以模拟正常流，换行用float:left；
- 只有正常流的BFC里面才会发生margin折叠；

### 三、BFC合并
- Block Container：里面有BFC的，能容纳正常流的盒，里面就有BFC；
	- block、inline-block、table-cell、flex item、grid cell、table-caption
- Block-level Box：外面有BFC的；
	- display:block、display: flex、display: table、display: grid
	- display: inline-block、display: inline-flex、display: inline-table、display: inline-grid 
- Block Box = Block Container + Block-level Box：里外都有BFC的


设立BFC

block box && overflow：visible
>能容纳正常流的盒都会创建BFC，只有block box 的 overflow：visible时不会创建，会发生BFC合并；

- BFC合并与float：block box的overflow不是visible时会创建独立BFC，整个block box放进BFC里面，block box的宽度受BFC影响，如果部创建BFC，里面的行盒受BFC影响；
- BFC合并与边距折叠：边距折叠只会发生在同一个BFC里面，如果创建了新的BFC就不会发生边距折叠，如果没有创建BFC的话就存在同向BFC折叠；