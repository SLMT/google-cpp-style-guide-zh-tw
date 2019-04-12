## `#define` 保護 (The `#define` Guard) <a name="define_guard"></a>

> 所有的標頭檔應該要包含 `#define` 保護，以防止多重載入。 其名稱的格式為 `<專案名稱>_<路徑>_<檔名>_H_`。

為了保證名稱的獨特性，應該要遵照該檔案在專案中的完整路徑來定義。 例如，一個在專案 foo 之中 `foo/src/bar/baz.h` 位置下的檔案，其保護應該要這樣寫：

```c++
#ifndef FOO_BAR_BAZ_H_
#define FOO_BAR_BAZ_H_

...

#endif  // FOO_BAR_BAZ_H_
```