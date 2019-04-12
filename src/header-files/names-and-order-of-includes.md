## `#include` 時的名稱與順序

> 利用右列順序 `#include` 標頭檔，避免隱藏的依賴關係：直屬的標頭檔、C 函式庫、C++ 函式庫、其他函式庫 `.h` 檔、你的專案的 `.h` 檔。

所有標頭檔的路徑應該都要以專案的程式碼目錄為起點，並且不要使用 UNIX 資料夾簡稱，像是 `.` (現在) 跟 `..` (上一個目錄)。 舉例來說，`google-awesome-project/src/base/logging.h` 檔案應該要被這樣載入：

```c++
#include "base/logging.h"
```

假設現在有 `dir/foo.cc` 或 `dir/foo_test.cc` 檔案，其目標在於實作或測試 `dir2/foo2.h` 檔內的東西，那麼 `#include` 的順序應該這樣寫：

1. `dir2/foo2.h`
2. C 系統檔
3. C++ 系統檔
4. 其他函式庫 `.h` 檔
5. 你的專案的 `.h` 檔

依照這個順序，如果 `dir2/foo2.h` 遺漏了任何必要的 `#include`，那麼在建置 `dir/foo.cc` 或 `dir/foo_test.cc` 的時候就會中斷。 因此這確保了建置會先在這些檔案中斷，而不是在其他無辜的地方發生。

`dir/foo.cc` 與其直屬的標頭檔 `dir2/foo2.h` 通常會放在同一個資料夾下，例如 `base/basictypes_test.cc` 跟 `base/basictypes.h`，但是有時候也有可能會分開放。

注意那些為了與 C 相容的標頭檔，像是 `stddef.h` 通常都有對應的 C++ 版本 (例如 `cstddef`)。 雖然兩種版本都可行，但是記得要維持一致性。

每個區塊中的檔案應該要依照字母順序排列。 要注意一些比較老的專案中可能沒有遵照這個規則，這些錯誤都應該要等方便的時候修改過來。

你應該要 `#include` 所有包含你使用到任何符號的標頭檔 (除非你在一些不尋常的狀況中使用了[前向宣告](forward-declarations.md))。 如果你使用了 `bar.h` 中的符號，別期待你 `#include` 了 `foo.h` 之後，`foo.h` 裡面會包含著 `bar.h`，此時你應該也要 `#include` `bar.h`。 除非 `foo.h` 有明顯地展現出它提供了 `bar.h` 中的符號。 另外，已經在直屬的標頭檔中 `#include` 過的東西，可以不用在 `cc` 檔中 `#include` (像是 `foo.cc` 可以依賴在 `foo.h` 上)。

舉個範例，`google-awesome-project/src/foo/internal/fooserver.cc` 檔中的 `#include` 可能長這樣：

```c++
#include "foo/server/fooserver.h"

#include <sys/types.h>
#include <unistd.h>
#include <hash_map>
#include <vector>

#include "base/basictypes.h"
#include "base/commandlineflags.h"
#include "foo/server/bar.h"
```

### 特例

有時候，只能在某些系統中使用的程式碼需要有條件地 `#include`，這種就可以程式碼就可以放在所有 `#include` 之後。 當然，盡可能地讓這種程式碼越少且影響範圍越小越好。 例子：

```c++
#include "foo/public/fooserver.h"

#include "base/port.h"  // For LANG_CXX11.

#ifdef LANG_CXX11
#include <initializer_list>
#endif  // LANG_CXX11
```
