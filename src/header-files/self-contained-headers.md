## 自給自足標頭檔 (Self-contained Headers)

> 標頭檔應該要自給自足 (self-contained)，也就是說，應該能夠單獨被引入並正確編譯，而且副檔名必須是 `.h`。 其他具有插入目的，但不是標頭檔者，則應該要使用 `.inc` 作為副檔名，並且應該盡少使用。

所有標頭檔都應該要自給自足。 換句話說，使用者或者重構工具 (Refactoring Tool) 並不需要依賴任何額外的條件才能夠引入標頭檔。 更精確地說，標頭檔應該要包含 [標頭檔保護](define-guard.md)，而且應該要自己插入所有需要的其他標頭檔。

如果一個標頭檔內宣告了行內函式 (Inline Functions) 或模板 (Templates)，並且這些函式或模板將由標頭檔的使用者進行實例化的話，那麼它們的定義必須直接出現在標頭檔內，或是出現在該標頭檔所包含的其他檔案中。 不要將這些定義移至單獨的 `-inl.h` 文件。 這種作法以前很常見，但現在我們不允許這樣做。 如果某個模板的實例化僅發生在同一個 `.cc` 檔案中，無論是因為它被 [顯示實例化 (Explicit Instantiation)](https://en.cppreference.com/w/cpp/language/class_template#Explicit_instantiation) (註一)，或是因為其定義只有該 `.cc` 檔案可以存取，那麼該模板的定義可以放在 `.cc` 檔案內。

在某些極少數的狀況下，標頭檔可以不用是自給自足的。 這些特殊的標頭檔通常是用來載入程式碼到一些不尋常的位置，例如引入到另一個檔案的中間某個部位。 他們可以不使用 [標頭檔保護](define-guard.md)，而且可以不載入他們所需的檔案。 這種類型的檔案應該使用 `.inc` 作為副檔名。 應盡量避免使用這類檔案，並優先考慮使用自給自足的標頭檔。

#### 註一：顯示實例化 (Explicit Instantiation) 說明

顯示實例化指的是在使用模板時，直接指示編譯器應該針對哪些型別生成對應的模板。 例如下面例子：

`my_class.h`:

```cpp
#ifndef MY_CLASS_H
#define MY_CLASS_H

template <typename T>
class MyClass {
 public:
  void DoSomething();
};

extern template class MyClass<int>;  // 宣告：MyClass<int> 會被顯式實例化（但不在這裡）

#endif  // MY_CLASS_H
```

`my_class.cc`:

```cpp
#include "my_class.h"

template <typename T>
void MyClass<T>::DoSomething() {
  // 實作內容
}

// 顯式實例化
template class MyClass<int>;   // 只會在這個 `.cc` 檔案內產生 MyClass<int> 的實例
```

這個有別於一般常見的隱性實例化 (Implicit Instantiation) 的作法，也就是只有單純宣告模板，然後在真正要使用時才指定型別變數 `T` 對應的型別。 顯性實例化可以大幅提升編譯速度，因為它會確保整個程式編譯時模板只對指定的型別各生成一份類別的程式碼。
