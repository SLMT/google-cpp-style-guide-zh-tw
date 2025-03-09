## 名稱空間 (Namespaces)

> 除了某些特殊情況外，程式碼應當放在名稱空間中。 名稱空間應該具有基於專案名稱的獨特名稱，可能也包含其路徑。 不要使用 using 指示詞 (using-directive)，像是 `using namespace foo`。 不要使用行內名稱空間 (inline namespace)。 關於未命名的名稱空間，請參考  「[內部連結性](internal-linkage.md)」 一節。

### 定義

名稱空間將全域作用域細分為彼此獨立且具名的子作用域，這可以有效避免在整個作用域中遇到名稱相衝的狀況。

### 優點

名稱空間提供了一種避免在大型程式中名稱相衝的同時，也能讓大部分程式碼使用較短名稱的方法。

例如，兩個不同的專案在全域都具有 `Foo` 這個類別，這個符號可能會在編譯或執行時發生衝突。 如果這些專案能把他們的程式碼分別放在各自的名稱空間下，那麼 `project1::Foo` 跟 `project2::Foo` 就會被視為不同的符號，也不會有衝突的問題，而且在各自的專案中還能夠繼續使用 `Foo` 這個名字同時不需加上前綴。

行內名稱空間 (inline namespace) 會自動把它們的名稱放進作用域中。 例如，請參考以下程式碼：

```cpp
namespace X {
inline namespace Y {
  void foo();
}  // namespace Y
}  // namespace X
```

這會使 `X::Y::foo()` 與 `X::foo()` 可以互相交換使用。 當初行內名稱空間的主要目標就是用來處理不同版本的 ABI (Application Binary Interface, 應用二進位介面) 的兼容問題。

### 缺點

名稱空間可能容易造成混淆，因為它們將找出一個名稱指向的實際東西這個機制複雜化。

行內名稱空間可能會造成混淆，因為名稱實際上不會受限於它們被宣告的名稱空間內。 它們只在某些需要分類不同版本的情況下才可能會有幫助。

在某些狀況中，可能會需要持續使用完整的名稱來指出正確的符號。 對於多層的名稱空間來說，這樣的寫法可能會造成雜亂。

### 決定

名稱空間應該如下列般使用：

- 遵從 [名稱空間命名](../naming/namespace-names.md) 一章的規則。
- 如同這章節的範例中在名稱空間的收尾處加上註解。
- 名稱空間必須將整個原始碼檔中，在 `#include` 、[gflags](https://gflags.github.io/gflags/) 定義和前向宣告其他名稱空間的類別之後的內容全部包裹起來。

  ```cpp
  // 在某個 .h 檔中
  namespace mynamespace {

  // 所有的定義都在名稱空間的作用域內
  // 注意這裡沒有縮排
  class MyClass {
   public:
    ...
    void Foo();
  };

  }  // namespace mynamespace
  ```

  ```cpp
  // 在某個 .cc 檔中
  namespace mynamespace {

  // 函式的定義也放在名稱空間的作用域內
  void MyClass::Foo() {
    ...
  }

  }  // namespace mynamespace
  ```

  較複雜的 `.cc` 檔可能包含額外細節，例如 flags 或者 using 指示詞。

  ```cpp
  #include "a.h"

  ABSL_FLAG(bool, someflag, false, "a flag");

  namespace mynamespace {

  using ::foo::bar;

  ...code for mynamespace...    // 程式碼左側不留空間

  }  // namespace mynamespace
  ```

- 如果想將自動產生的協議訊息 (Protocol Message) 的程式碼放在命名空間中，請在 `.proto` 中使用 `package` 來指定。 詳情請參考 [Protocol Buffer Packages](https://protobuf.dev/reference/cpp/cpp-generated/#package)。
- 別在 `std` 名稱空間下宣告任何東西，包括標準函式庫的前向宣告。 宣告 `std` 名稱空間下的實體可能導致未定義的行為，也就是說，這並不是一個跨平台的作法。 如果想要宣告標準函式庫內的實體，請直接 `#include` 那些標頭檔。
- 你不該為了要讓某個名稱空間中的名稱皆可直接呼叫而使用 「using 指示詞 (using-directive)」。

  ```cpp
  // 禁用 -- 這會汙染名稱空間
  using namespace foo;
  ```

- 別在標頭檔中的名稱空間中使用名稱空間別名 (Namespace Alias)，除非是在明確被標示為只給專案內部使用的名稱空間。 因為在一個被載入的標頭檔內的任何東西，都會被當作該檔的公開 API 對待。

  ```cpp
  // 在 `.cc` 檔中簡化存取某個常用名稱的動作
  namespace fbz = ::foo::bar::baz;
  ```

  ```cpp
  // 在 `.h` 檔中簡化存取某個常用名稱的動作
  namespace librarian {
  namespace internal {  // 內部區域，不是公共 API 的一部份
  namespace sidetable = ::pipeline_diagnostics::sidetable;
  }  // namespace internal

  inline void my_inline_function() {
    // 只在這個函式（或方法）內才有作用的命名空間別名
    namespace baz = ::foo::bar::baz;
    ...
  }
  }  // namespace librarian
  ```

- 別使用行內名稱空間
- 在名稱空間的命名中加入 `internal` 字樣來標註這個名稱空間不該被 API 的使用者所用。
 
  ```cpp
  // 我們不該在非 `absl` 的名稱空間中使用向下面這種內部 API。
  using ::absl::container_internal::ImplementationDetail;
  ```

- 我們推薦在新程式碼中使用單行巢狀名稱空間，但不是必須的。

### 譯註四：行內名稱空間介紹

因為行內名稱空間並非常見的 C++ 特性，以下稍微介紹一下這個功能。

首先看下面這段範例：

```cpp
namespace a {
namespace b {
void fun() {
    // code
}
}  // namespace b
}  // namespace a
```

一般來說，上面這段程式碼想要呼叫 `fun` 這個函式的話，就要使用 `a::b::fun()` 這個名稱。 但是如果此時引入了行內關鍵字，在 `namespace b` 前面加上 `inline`，變成這樣：

```cpp
namespace a {
inline namespace b {
void fun() {
    // code
}
}  // namespace b
}  // namespace a
```

這個時候你使用 `a::fun()` 這個名稱的話，就可以呼叫到 `fun` 這個函式。 當然，使用 `a::b::fun()` 也同樣可以呼叫得到 `fun`。 有興趣的話可以自己試試看。

運作的原理很簡單，其實就是程式在編譯將 `a::fun()` 解析成 `a::b::fun()` 而已。

那這個技巧有甚麼用？ 既然我想讓其他人直接呼叫到 `fun`，那為什麼還要特別放一個 `namespace b`？

這個技巧最常用到的地方，就像上面 Google 文件中所提到的，版本控管。

如果今天我是在寫函式庫，此時我寫了兩種不同版本的 `fun`，可是有些人的程式已經連結到了舊版的 `fun`，那要怎麼樣在不重新編譯那些程式的狀況下保持連結？ 這個時候可以這樣做：

假設原本的函式庫長這樣：

```cpp
namespace some_lib {
inline namespace v1 {
void fun() {
    // code
}
}  // namespace v1
}  // namespace some_lib
```

因此原本編譯的程式裡，呼叫到 `some_lib::fun` 的地方都會連結到 `some_lib::v1::fun`。 而此時我只要改成：

```cpp
namespace some_lib {
namespace v1 {
void fun() {
    // code
}
}  // namespace v1
inline namespace v2 {
void fun() {
    // code
}
}  // namespace v2
}  // namespace some_lib
```

這樣原本連結到 `some_lib::v1::fun` 的程式仍然可以運作，而且新的程式呼叫 `some_lib::fun` 時，也可以如我預期地使用到新的版本 (v2 版)。 因此行內名稱空間才常用於函式庫的版本控管。 但是如同 Google 風格指南所說，這樣的行為可能實在會導致預期外的結果，所以還是盡量避免使用。
