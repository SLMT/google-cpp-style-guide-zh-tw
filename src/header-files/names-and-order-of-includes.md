## `#include` 時的名稱與順序

> 以右列順序引入標頭檔：相關的標頭檔、C 系統標頭檔、C++ 標準函式庫標頭檔、其他函式庫的標頭檔、你的專案的標頭檔。

所有標頭檔的路徑應該都要以專案的程式碼目錄為起點，並且不要使用 UNIX 資料夾別名，像是 `.` (現在目錄) 跟 `..` (上層目錄)。 舉例來說，`google-awesome-project/src/base/logging.h` 檔案應該要被這樣引入：

```cpp
#include "base/logging.h"
```

只有當函式庫要求時，才應該使用尖括號符號引入標頭檔。 準確來說，應該只有以下標頭檔必須使用尖括號：

- C 與 C++ 的標準函式庫標頭檔（例如：`<stdlib.h>` 與 `<string>`）。
- POSIX、Linux 與 Windows 系統標頭檔（例如：`<unistd.h>` 與 `<windows.h>`）。
- 在少數情況中，第三方的函式庫（例如：`<Python.h>`）。

假設現在有 `dir/foo.cc` 或 `dir/foo_test.cc` 檔案，目標是實作或測試 `dir2/foo2.h` 檔內的東西，那麼 `#include` 的順序應該這樣寫：

1. `dir2/foo2.h`
2. 空白行
3. C 系統檔，或是其他應該用尖括號引入且以 `.h` 為副檔名的標頭檔（例如：`<unistd.h>`、`<stdlib.h>` 與 `<Python.h>`）。
4. 空白行
5. C++ 標準函式庫標頭檔且不含副檔名（例如：`<algorithm>` 與 `<cstddef>`）。
6. 空白行
7. 其他函式庫的 `.h` 檔。
8. 空白行
9. 你的專案的 `.h` 檔。

注意所有有包含標頭檔的群組都應該以空白行分開。

依照這個順序，如果 `dir2/foo2.h` 遺漏了任何必要的 `#include`，那麼在建置 `dir/foo.cc` 或 `dir/foo_test.cc` 的時候就會中斷。 這樣可以確保建置錯誤會首先影響到這些文件的開發者，而不會影響到其他不相關的專案開發者。

上述例子中的 `dir/foo.cc` 與其直接相關的標頭檔 `dir2/foo2.h` 通常會放在同一個資料夾下，例如 `base/basictypes_test.cc` 跟 `base/basictypes.h`，但是有時候也有可能會分開放。

注意那些為了與 C 相容的標頭檔，像是 `stddef.h` 通常都有對應的 C++ 版本（例如 `cstddef`）。 雖然兩種版本都可以接受，但是記得要維持程式碼整體的一致性。

每個區塊中的檔案應該要依照字母順序排列。 要注意一些比較老的專案中可能沒有遵照這個規則，這些錯誤應在適當的時機進行修正。

例如 `google-awesome-project/src/foo/server/fooserver.cc` 檔中的 `#include` 可能長這樣：

```cpp
#include "foo/server/fooserver.h"

#include <sys/types.h>
#include <unistd.h>

#include <string>
#include <vector>

#include "base/basictypes.h"
#include "foo/server/bar.h"
#include "third_party/absl/flags/flag.h"
```

### 例外

有時候，針對某些系統的程式碼可能需要條件式 `#include`，這種引入就可以放在所有 `#include` 之後。 當然，盡可能地讓這種程式碼越少且影響範圍越小越好。

例子：

```cpp
#include "foo/public/fooserver.h"

#include "base/port.h"  // 可能有 LANG_CXX11

#ifdef LANG_CXX11
#include <initializer_list>
#endif  // LANG_CXX11
```
