## 引入你需要的

> 如果一份原始碼檔或者標頭檔使用了一個定義在其他地方的符號，該檔應該要直接引入明確提供該符號的宣告或者定義的標頭檔。 它不應該為了其他目的引入標頭檔。

不要依賴傳遞式引入 (Transitive Inclusions) (譯註二)。 這讓大家可以放心移除自己標頭檔中不需要的 `#include`，而不會影響使用該標頭檔案的程式碼。 這項原則同樣適用於相關標頭檔： `foo.cc` 如果使用了 `bar.h` 的符號，那就該直接引入。 即使 `foo.h` 已經引入了 `bar.h`，`foo.cc` 仍應直接引入 `bar.h`。

#### 譯註二：傳遞式引入 (Transitive Inclusion) 說明

假設有以下兩個標頭檔：

`a_class.h`:

```cpp
#ifndef A_CLASS_H
#define A_CLASS_H

class A {
 public:
  void DoSomethingA();
};

#endif  // A_CLASS_H
```

`b_class.h`:

```cpp
#ifndef B_CLASS_H
#define B_CLASS_H

#include "a_class.h"

class B {
 public:
  void DoSomethingB(A a);
};

#endif  // B_CLASS_H
```

此時若 `class B` 的實作 `b_class.cc` 沒有引入 `a_class.h`，而是依賴 `b_class.h` 的引入的話，就叫做傳遞式引入。 但 Google 的風格指南是鼓勵不要依賴這種引入。
