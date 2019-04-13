## 名稱空間 (Namespaces)

> 除了某些特殊情況外，程式碼應當放在名稱空間中。 名稱空間應該要有個跟專案名稱有關、獨一無二的名字，最好也把路徑考慮進去。 不要使用 using 指示詞 (using-directive)，像是 `using namespace foo`。 不要使用行內名稱空間 (inline namespace)。 關於未被命名的名稱空間，請參考「[無名名稱空間與靜態變數](unnamed-namespace-and-static-variables.md)」一章。

### 定義

名稱空間將全域區分為多塊分開、各自命名的作用域，這可以有效避免在整個作用域中遇到名稱相同的狀況。

### 優點

名稱空間提供了一種避免在大型程式中名稱相衝的同時，也能讓大部分程式碼使用較短名稱的方法。

例如，兩個不同的專案在全域都具有 `Foo` 這個類別，這個符號可能會在編譯或執行時發生衝突。 如果這些專案能把他們的程式碼分別放在不同的名稱空間下，那麼 `project1::Foo` 跟 `project2::Foo` 就會被視為不同的符號，也不會有衝突的問題，而且在各自的專案中還能夠繼續使用 `foo` 這個名字同時不需加上前綴。

行內名稱空間 (inline namespace) 會自動把它們的名稱放進作用域中。 例如，請參考以下程式碼：

```c++
namespace X {
inline namespace Y {
  void foo();
} // namespace Y
} // namespace X
```

這會產生 `X::Y::foo()` 等同於 `X::foo()` 的效果。 當初行內名稱空間的主要目標就是用來處理不同版本的 ABI (Application Binary Interface, 應用二進位介面) 的兼容問題。

### 缺點

名稱空間可能容易造成混淆，因為它在類別存在的情況下，又額外提供了一種切分命名作用域的方式。

行內名稱空間可能也會造成混淆，因為它的作用域有時並非如它當初宣告的那樣。 只有在某些需要分類不同版本的情況下才可能會有幫助。

在某些程式碼中，可能會需要使用完整的名稱來指出所需的名稱空間。 對於深層的名稱空間來說，這樣的寫法可能會造成一些混亂。

### 我們的決定

名稱空間應該如下列般使用：

- 遵從 [名稱空間命名](#) 一章的規則。
- 如同範例中在名稱空間的尾端加上註解。
- 名稱空間必須將整個原始碼檔中，除了 `#include` 、[gflags](https://gflags.github.io/gflags/) 定義和前向宣告其他名稱空間的類別之外的內容包裹起來。

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

  一般的的 `.cc` 檔中可能會有更多複雜的細節，例如 flags 或者 using 指示詞。

  ```c++
  #include "a.h"

  DEFINE_bool(someflag, false, "dummy flag");

  namespace mynamespace {

  using ::foo::bar;

  ...code for mynamespace...    // 程式碼左側不留空間

  }  // namespace mynamespace
  ```

- 如果想將產生的協議訊息 (Protocol Message) 的程式碼放在命名空間中，請在 `.proto` 中使用 `package` 來指定。 詳情請參考 [Protocol Buffer Packages](https://developers.google.com/protocol-buffers/docs/reference/cpp-generated#package)。
- 別在 `std` 名稱空間下宣告任何東西，甚至是標準函式庫的前向宣告。 宣告 `std` 名稱空間下的作法沒有一個統一的標準，也就是說，這並不是一個跨平台的作法。 如果想要宣告標準函式庫內的實體，請直接 `#include` 那些標頭檔。
- 你不該為了要讓某個名稱空間中的名稱皆可直接呼叫而使用「using 指示詞 (using-directive)」

  ```c++
  // 禁用 -- 這會汙染你的名稱空間
  using namespace foo;
  ```

- 別在標頭檔中的名稱空間中使用名稱空間別名 (Namespace Alias)，除非是在明確被標示為只給專案內部使用的名稱空間。 因為在一個被載入的標頭檔內的任何東西，都會被當作該檔的公共 API 對待。

  ```c++
  // 在 `.cc` 檔中簡化存取某個常用名稱的動作
  namespace fbz = ::foo::bar::baz;
  ```

  ```c++
  // 在 `.h` 檔中簡化存取某個常用名稱的動作
  namespace librarian {
  namespace impl {  // 內部區域，不是公共 API 的一部份
  namespace sidetable = ::pipeline_diagnostics::sidetable;
  }  // namespace impl

  inline void my_inline_function() {
    // 只在這個函式（或方法）內作用的命名空間別名
    namespace baz = ::foo::bar::baz;
    ...
  }
  }  // namespace librarian
  ```

- 別使用行內名稱空間

### 譯註

就我所知，行內名稱空間是非常鮮見的東西，至少從我學習 C/C++ 到現在都沒有在一個實際的專案中看過。 這邊稍微介紹一下這個功能。

首先看下面這段範例：

```c++
namespace A {
namespace B {
void fun() {
    // code
}
}
}
```

一般來說，上面這段程式碼想要呼叫 `fun` 這個函式的話，就要使用 `A::B::fun()` 這個名稱。 但是如果此時引入了行內關鍵字，在 B 前面加上 `inline`，變成這樣：

```c++
namespace A {
inline namespace B {
void fun() {
    // code
}
}
}
```

這個時候你使用 `A::fun()` 這個名稱的話，就可以呼叫到 `fun` 這個函式。 當然，使用 `A::B::fun()` 也同樣可以呼叫得到 `fun`。 有興趣的話可以自己試試看。

運作的原理很簡單，其實就是程式在編譯時將所有 `A::fun()` 的名稱代換為 `A::B::fun()` 而已。

那這個技巧有甚麼用？ 既然我想讓其他人直接呼叫到 `fun`，那為什麼還要特別放一個 `namespace B`？

這個技巧最常用到的地方，就像上面 Google 文件中所提到的，版本控管。

如果今天我是在寫函式庫，此時我寫了兩種不同版本的 `fun`，可是有些人的程式已經連結到了舊版的 `fun`，那要怎麼樣在不重新編譯那些程式的狀況下保持連結？ 這個時候可以這樣做：

假設原本的函式庫長這樣：

```c++
namespace SomeLib {
inline namespace v1 {
void fun() {
    // code
}
}
}
```

因此原本編譯的程式裡，呼叫到 `SomeLib::fun` 的地方都會連結到 `SomeLib::v1::fun`。 而此時我只要改成：

```c++
namespace SomeLib {
namespace v1 {
void fun() {
    // code
}
}
inline namespace v2 {
void fun() {
    // code
}
}
}
```

這樣原本連結到 `SomeLib::v1::fun` 的程式仍然可以運作，而且新的程式呼叫 `SomeLib::fun` 時，也可以如我預期地使用到新的版本 (v2 版)。 因此行內名稱空間才常用於函式庫的版本控管。 但是如同 Google Style 所說，這樣的行為可能實在會導致預期外的結果，所以還是盡量避免使用。
