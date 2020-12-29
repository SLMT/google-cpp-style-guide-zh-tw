## 型別名稱 (Type Names)

> 型別名稱始於一個大寫字母，並且每個單字的開頭皆為大寫字母，同時不包含底線：`MyExcitingClass`、`MyExcitingEnum`。

所有型別的名稱 - 類別、結構、型別別名、列舉、型別模板參數 - 都有相同的命名慣例。 型別名稱始於一個大寫字母，並且每個單字的開頭皆為大寫字母。 沒有底線。 例如：

```c++
// 類別與結構
class UrlTable { ...
class UrlTableTester { ...
struct UrlTableProperties { ...

// typedef
typedef hash_map<UrlTableProperties *, string> PropertiesMap;

// 使用別名
using PropertiesMap = hash_map<UrlTableProperties *, string>;

// 列舉
enum UrlTableErrors { ...
```
