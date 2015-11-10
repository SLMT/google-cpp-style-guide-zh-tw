# 作用域 (Scoping)

## 名稱空間 (Namespace) <a name="namespace"></a>

> 我們鼓勵在 `.cc` 檔案中使用無名的名稱空間。 如果要命名的話，請取跟專案有關的名字，最好也把路徑考慮進去。 不要使用 using 指示詞 (using-directive)。 不要使用行內名稱空間 (inline namespace)。

### 定義

名稱空間將全域區分為多塊分開、各自命名的作用域，這可以有效避免在整個作用域中遇到名稱相同的狀況。

### 優點

名稱空間提供了一種具有名稱的分界線 (階層性的)，就如同類別提供了更細的分界方式 (也是階層性的)。

例如，兩個不同的專案在全域都具有 `Foo` 這個類別，這個符號可能會在編譯或執行時發生衝突。 如果這些專案能把他們的程式碼分別放在不同的名稱空間下，那麼 `project1::Foo` 跟 `project2::Foo` 就會被視為不同的符號，也不會有衝突的問題。

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

行內名稱空間可能也會造成混淆，因為它的作用域有時並非如它當初宣告的那樣。 只有在某些需要分類不同版本的情況下才可能會有幫助。

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

然而，跟某個特定類別有關，並涵蓋整個檔案的宣告應該要作為型別、靜態資料成員或者靜態成員函式放在類別之中，而不是直接放在無名名稱空間內。

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

- 別在 `std` 名稱空間下宣告任何東西，甚至是標準函式庫的前向宣告。 宣告 `std` 名稱空間下的作法沒有一個統一的標準，並不是一個跨平台的作法。 如果想要宣告標準函式庫內的實體，請直接 `#include` 那些標頭檔。

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
// 注意指示詞與宣告的不同在於，
// 前者是將整個名稱空間載入
// 後者只是使用名稱空間中的一小部分
using ::foo::bar;
```

- 你可以在 `.cc` 檔中任意處、`.h` 檔中名稱空間包裹的範圍下，或函式、方法內為名稱空間定義別名 (alias)。

```c++
// 在 `.cc` 檔中簡化存取某個常用名稱的動作
namespace fbz = ::foo::bar::baz;

// 在 `.h` 檔中簡化存取某個常用名稱的動作
namespace librarian {
// 以下別名可以被任何載入這個標頭檔的檔案使用 (在 librarian 名稱空間內)
// 別名在同一個專案中應該要有一致性的命名方式
namespace pd_s = ::pipeline_diagnostics::sidetable;

inline void my_inline_function() {
  // 僅在這個函式內作用的別名
  namespace fbz = ::foo::bar::baz;
  ...
}
}  // namespace librarian
```

要注意標頭檔內的別名會被任何有 `#include` 的其他檔案看見。 因此公開的標頭檔 (那些會給其他專案使用的標頭檔)，或是會被那些檔案 `#include` 的其他標頭檔，都應該要避免定義別名。 這是為了要維護公開 APIs 越小越好的原則。

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

這樣原本連結到 `SomeLib::v1::fun` 的程式仍然可以運作，而且新的程式呼叫 `SomeLib::fun` 時，也可以如我預期地使用到新的版本。 因此行內名稱空間才常用於函式庫的版本控管。

## 非成員、靜態成員、全域函式

> 盡量將非成員函式放在名稱空間中，少用完全的全域函式。 盡量用名稱空間來組織函式，而不是用類別。 類別的靜態成員一般來說應該要與類別的實例或者靜態資料有關。

### 優點

非成員及靜態成員函式在某些狀況下很有用。 將非成員函式放在名稱空間中可以避免汙染全域的名稱空間。

### 缺點

非成員及靜態成員函式也許作為某個類別中的成員會更合理，特別是這些函式會存取一些外部資源或者有高度相關時。

### 抉擇

有時候定義一個不受類別實例限制的函式很有用，甚至某些狀況下是必要的。 這樣的函式可以是非成員或者靜態成員函式。 非成員函式不應該依賴在某個外部變數上，而且應該放在某個名稱空間內。 不要特別為了一群函式建立一個沒有分享任何靜態變數的類別，如果要組織起來的話，請使用[名稱空間](#namespace)。 例如，在 `myproject/foo_bar.h` 標頭檔內，請寫：

```c++
namespace myproject {
namespace foo_bar {
void Function1();
void Function2();
}
}
```

而不要寫：

```c++
namespace myproject {
class FooBar {
 public:
  static void Function1();
  static void Function2();
};
}
```

如果你需要定義一個非成員函式，而且這個函式只會用在某個 `.cc` 檔中，請使用無名的[名稱空間](#namespace)或者 `static` 連鎖 (像是 `static int Foo() {...}`) 來限制它的作用域。

## 區域變數

> 將函式的變數盡可能地放在最小的作用域內，並在宣告變數的同時初始化

C++ 允許你在函式內的任何地方宣告變數。 我們鼓勵你盡可能地將變數宣告在越局部的 (local) 作用域越好，並且最好越靠近它第一次被使用的地方。 這讓讀者會更容易找到變數的宣告處以及了解它的型別是甚麼。 特別要注意初始化與宣告不該分開，例如：

```c++
int i;
i = f();      // 不好 -- 初始化與宣告分離
```

```c++
int j = g();  // 良好 -- 宣告同時初始化
```

```c++
vector<int> v;
v.push_back(1);  // 最好使用括號初始化法 (brace initialization)
v.push_back(2);
```

```c++
vector<int> v = {1, 2};  // 良好 -- v 一開始就初始化好
```

`if`、`while` 與 `for` 陳述句需要的變數一般來說應該要被宣告並限制在所屬的作用域內，例如：

```c++
while (const char* p = strchr(str, '/')) str = p + 1;
```

有一個要注意的特例：如果該變數是物件，那該物件的建構函式每次進入這個作用域時就會被呼叫一次，解構函式也會每次離開時都會被呼叫到。

```c++
// 低效率的寫法
for (int i = 0; i < 1000000; ++i) {
  Foo f;  // 我的建構函式與解構函式會各被呼叫 1000000 次
  f.DoSomething(i);
}
```

此時將這個變數宣告在迴圈外面，程式執行時會比較有效率：

```c++
Foo f;  // 我的建構函式與解構函式只會各被呼叫一次
for (int i = 0; i < 1000000; ++i) {
  f.DoSomething(i);
}
```

## 靜態與全域變數

不允許使用有著靜態生存期 ([static storage duration](http://en.cppreference.com/w/cpp/language/storage_duration#Storage_duration)) 的類別變數：這類變數之間建構、解構的順序並不固定，常常造成許多難以找出的錯誤。 然而，如果他們是 `constexpr` (常數表達式) 的話就可以用：因為他們不會被動態初始化或解構。

有著靜態生存期 (static storage duration) 的物件，包含全域變數、靜態變數、靜態類別成員變數和函式靜態變數，必須要是 POD (Plain Old Data)。 POD 只能包含整數、字元、浮點數、指標、陣列或者結構。

C++ 只有部分規範類別靜態變數在建構與解構時的執行順序，甚至每次建置的之後的呼叫順序也有可能不同，這會造成一些難以找出的錯誤。 因此除了全域的類別變數外，我們也禁止用函式的結果來初始化靜態的 POD 變數，除非那個函式並不是依賴於其他全域資訊上 (像是 `getenv()` 或 `getpid()`)。 (這項禁令不適用於函式作用域內的靜態變數，因為這類變數的初始化順序已經有嚴格定義過了，而且只會在程式執行到宣告位置的時候才會開始初始化)

同樣地，無論程式從 `main()` 返回而終止，或是因為呼叫 `exit()` 終止，全域與靜態變數都會在程式結束的時候被摧毀。 解構函式被呼叫的順序被定義為建構函式的呼叫順序的反向。 因為建構函式的順序並不一定，因此解構函式也沒有固定順序。 例如，程式結束時有個靜態變數被摧毀了，但是程式碼還在跑，此時 (也許在其他線程中) 存取這個變數就會發生錯誤。 或是某個字串的解構函式會在另一個含有該字串的變數的解構函式之前執行。

One way to alleviate the destructor problem is to terminate the program by calling quick_exit() instead of exit(). The difference is that quick_exit() does not invoke destructors and does not invoke any handlers that were registered by calling atexit(). If you have a handler that needs to run when a program terminates via quick_exit() (flushing logs, for example), you can register it using at_quick_exit(). (If you have a handler that needs to run at both exit() and quick_exit(), you need to register it in both places.)

As a result we only allow static variables to contain POD data. This rule completely disallows vector (use C arrays instead), or string (use const char []).

If you need a static or global variable of a class type, consider initializing a pointer (which will never be freed), from either your main() function or from pthread_once(). Note that this must be a raw pointer, not a "smart" pointer, since the smart pointer's destructor will have the order-of-destructor issue that we are trying to avoid.

### 譯註

POD (Plain Old Data) 簡單來說指的就是不含建構函式、解構函式與虛擬成員函式的類別。
