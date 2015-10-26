# 作用域 (Scoping)

## 名稱空間 (Namespace)

> 我們鼓勵在 `.cc` 檔案中使用無名的名稱空間。 如果要命名的話，請以取跟專案有關的名字，最好也把路徑考慮進去。 不要使用 `using`。 不要使用行內名稱空間 (inline namespace)。

### 定義

名稱空間將全域區分為多塊分開，且各自命名的作用域，這可以有效避免在整個作用域中遇到名稱相同的狀況。

### 優點

名稱空間提供了一種名稱的分界線 (階層性的)，就像是類別則提供了更細的分界方式 (也是階層性的)。

例如，如果兩個不同的專案在全域都具有 `Foo` 這個類別，這個符號可能會在編譯或執行時發生衝突。 如果這些專案能把他們的程式碼分別放在不同的名稱空間下，那麼 `project1::Foo` 跟 `project2::Foo` 就會被視為不同的符號，也不會有衝突的問題。

Inline namespaces automatically place their names in the enclosing scope. Consider the following snippet, for example:

```c++
namespace X {
inline namespace Y {
  void foo();
}
}
```

The expressions X::Y::foo() and X::foo() are interchangeable. Inline namespaces are primarily intended for ABI compatibility across versions.

### 缺點

名稱空間可能容易造成混淆，因為它在類別存在的情況下，又額外提供了一種切分命名作用域的方式。

行內名稱空間可能會造成混淆，因為它的作用域並非如它當初宣告的那樣。 只有在某些需要進行版本分類的情況下才可能會有幫助。
