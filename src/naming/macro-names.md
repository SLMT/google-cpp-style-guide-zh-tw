# 巨集名稱

> 你不是真要定義一個[巨集](../other-cpp-features/preprocessor-marcos.md)吧？ 如果真的要做的話，他們應該長這樣：`MY_MACRO_THAT_SCARES_SMALL_CHILDREN_AND_ADULTS_ALIKE`。

請先閱讀[關於巨集的說明](../other-cpp-features/preprocessor-marcos.md)； 一般來說不該使用巨集。 然而如果你真的需要使用，他們應該全部使用大寫與底線命名，並同時以專案名稱作為開頭。

```cpp
#define MYPROJECT_ROUND(x) ...
```
