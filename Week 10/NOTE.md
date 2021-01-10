### 收集元素进行：
根据主轴的尺寸把元素进行分行，如果放不下了就换行，如果设置了no-wrap就分配在同一行。
### 计算主轴：
找出所有Flex元素，把主轴方向剩余尺寸按比例分配给元素，如果剩余空间为负数，所有flex元素为0则等比压缩剩余元素。

如果没有flex元素，则根据justfiyContent来计算元素位置。

### 计算交叉轴：

### specificity 计算公式
div div #id
[0,     1,  0,      2]
inline  id  class   tag

div .cls #id
[0,     1,  1,      1]

从左到右，优先级依次下降，inline是写在style属性上的CSS，优先级是1，所以style属性上的CSS优先级最高。