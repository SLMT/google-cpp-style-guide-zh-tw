# 作用域 (Scoping)

## 名稱空間 (Namespace)

> 我們鼓勵在 `.cc` 檔案中使用無名的名稱空間。 如果要命名的話，請以取跟專案有關的名字，最好也把路徑考慮進去。 不要使用 `using`。 不要使用行內名稱空間 (inline namespace)。

### 定義

名稱空間將全域區分為多塊分開，且各自命名的作用域，這可以有效避免在整個作用域中遇到名稱相同的狀況。

### 優點

名稱空間提供了一種名稱的分界線 (階層性的)，就像是類別則提供了更細的分界方式 (也是階層性的)。

例如，如果兩個不同的專案在全域都具有 `Foo` 這個類別，這個符號可能會在編譯或執行時發生衝突。 如果這些專案能把他們的程式碼分別放在不同的名稱空間下，那麼 `project1::Foo` 跟 `project2::Foo` 就會被視為不同的符號，也不會有衝突的問題。

行內名稱空間 (inline namespace) 會自動把它們的名稱放進作用域中。 例如，請參考以下程式碼：

```c++
namespace X {
inline namespace Y {
  void foo();
}
}
```

這會產生 `X::Y::foo()` 等同於 `X::foo()` 的效果。 當初行內名稱空間的主要目標就是用來處理不同版本的 ABI (Application Binary Interface, 應用二進位介面) 的兼容問題。

### 缺點

名稱空間可能容易造成混淆，因為它在類別存在的情況下，又額外提供了一種切分命名作用域的方式。

行內名稱空間可能會造成混淆，因為它的作用域並非如它當初宣告的那樣。 只有在某些需要分類不同版本的情況下才可能會有幫助。

在標頭檔中使用無名的名稱空間可能容易違反 C++ 單一定義原則 (ODR, One Difinition Rule)。

### 抉擇

請依照下列規則使用名稱空間。 記得在名稱空間的尾端以註解的方式標上尾端記號，就像下面的例子一樣。

#### 無名名稱空間

- 我們允許，甚至鼓勵在 `.cc` 檔中多使用無名名稱空間，以避免連結期間的名稱衝突：

```c++
namespace { // 在某個 .cc 檔中

// 注意名稱空間中的內容都沒有縮排
//
// 這個功能可以保證你不會產生跟其他符號衝突的名稱，
// 而且只能被這個 .cc 檔中的東西呼叫到
bool UpdateInternals(Frobber* f, int newval) {
  ...
}

}  // namespace
```

However, file-scope declarations that are associated with a particular class may be declared in that class as types, static data members or static member functions rather than as members of an unnamed namespace.

- 別在 `.h` 檔中使用無名名稱空間。

#### 有命名的名稱空間

有命名的名稱空間應該要如下列方式使用：

- 名稱空間必須將整個原始碼檔中，`#include` 、gflags 定義和前向宣告其他類別之後的內容包裹起來。

```c++
// 在某個 .h 檔中
namespace mynamespace {

// 所有的定義都在名稱空間的作用域內
// 注意沒有使用縮排
class MyClass {
 public:
  ...
  void Foo();
};

}  // namespace mynamespace
```

```c++
// 在某個 .cc 檔中
namespace mynamespace {

// 函式的定義也放在名稱空間的作用域內
void MyClass::Foo() {
  ...
}

}  // namespace mynamespace
```

一般的的 `.cc` 檔中可能會有更多複雜的細節，包含其他名稱空間的類別等等。

```c++
#include "a.h"

DEFINE_bool(someflag, false, "dummy flag");

class C;  // 前向宣告全域名稱空間下的類別 C
namespace a { class A; }  // 前向宣告 a::A.

namespace b {

... b 的程式碼 ...        // Code goes against the left margin.

}  // namespace b
```

- 別在 `std` 名稱空間下宣告任何東西，甚至是標準函式庫的前向宣告。 宣告 `std` 名稱空間下的作法沒有一個統一的標準，不是一個跨平台的作法。 如果想要宣告標準函式庫內的實體，請直接 `#include` 那些標頭檔。

- 你不該為了要讓某個名稱空間中的名稱皆可直接呼叫而使用「using 指示詞 (using-directive)」

```c++
// 禁用 -- 這會汙染你的名稱空間
using namespace foo;
```

- 你可以在 `.cc` 檔的任意處，或者 `.h` 檔中的函式、方法、類別中使用「using 宣告 (using-declaration)」

```c++
// 可以在 .cc 檔中使用
// 或者必須在 .h 檔中的函式、方法或者類別之中
//
// 譯註：
// 注意宣告與指示詞的不同在於，
// 前者只是使用名稱空間中的單一實體
// 後者則是將整個名稱空間載入
using ::foo::bar;
```

- 你可以在 `.cc` 檔中任意處、`.h` 檔中名稱空間包裹的範圍下，或函式、方法內使用為名稱空間定義別名 (alias)

```c++
// 在 `.cc` 檔中簡化存取某個常用名稱的動作
namespace fbz = ::foo::bar::baz;

// 在 `.h` 檔中簡化存取某個常用名稱的動作
namespace librarian {
// 以下別名可以被任何載入這個標頭檔的檔案使用 (在 librarian 名稱空間內)
// 別名應該在同一個專案中應該要有一致性的命名方式
namespace pd_s = ::pipeline_diagnostics::sidetable;

inline void my_inline_function() {
  // 僅在這個函式內作用的名稱空間別名
  namespace fbz = ::foo::bar::baz;
  ...
}
}  // namespace librarian
```

Note that an alias in a .h file is visible to everyone #including that file, so public headers (those available outside a project) and headers transitively #included by them, should avoid defining aliases, as part of the general goal of keeping public APIs as small as possible.

- 別使用行內名稱空間

### 譯註
