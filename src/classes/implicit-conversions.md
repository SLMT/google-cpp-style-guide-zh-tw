## 隱性轉換 (Implicit Conversions)

> 不要定義隱性轉換。 在轉換運算子與接受單一引數的建構子上標註 `explicit` 關鍵字。

### 定義

隱性轉換允許將一種型別 (來源型別) 的物件用於原本預期另一種不同的型別 (目的型別) 的地方，像是將 `int` 的引數傳遞給接受 `double` 參數的函式。

除了語言本身定義的隱性轉換之外，使用者也可以藉由在來源型別或目的型別的類別中加入成員來自行定義。 在來源型別定義隱性轉換的操作可以藉由定義一個以目的型別命名的轉型運算子來達成，例如 `operator bool()` 可以讓該型別隱性轉換為 `bool`。 在目的型別定義隱性轉換的操作則可以藉由定義一個只接受來源型別為唯一參數的建構子達到 (或是唯一一個沒有預設值的參數)。

使用者可以在建構子或 (自從 C++11 之後) 在轉換運算子前加上 `explicit` 關鍵字，來確保只在使用當下明確知道目的型別 (例如強制轉型) 時才能使用。 這個限制除了應用於隱性轉換外，也會應用於 C++11 的 list 初始化語法：

```c++
class Foo {
  explicit Foo(int x, double y);
  ...
}

void Func(Foo f);
```

```c++
Func({42, 3.14}); // 錯誤
```

這類程式碼技術上來說並不算是隱性轉換，但是語言把它納入 `explicit` 關鍵字的規範中。

### 優點

- 隱性轉換讓一個型別藉由在容易看出型別的場合消去明確寫出型別的必要，來使得該型別更易於使用且明瞭。
- 隱性轉換可以當作比多載 (overloading) 更簡單的一種方案，例如可以免去一個名為 `string_view` 的函式為了 `string` 與 `const char*` 兩種型別使用多載的必要。
- List 初始化語法是一種用於初始化物件且簡潔明瞭的做法。

### 缺點

- 隱性轉換會隱藏型別不合 (type-mismatch) 的 bug，像是目的型別不符合使用者的預期，或是使用者根本沒意識到有轉換發生。
- 隱性轉換會讓程式碼更難以閱讀，特別是在跟多載同時出現的場合，這使得更難找出確切哪一段程式碼被呼叫到。
- 單一引數的建構子可能會被意外地用於隱性型別轉換，就算這並非本意。
- 如果一個單一引數的建構子沒有標註 `explicit`，並沒有一種可靠的方式能夠判斷到底是作者想要提供隱性轉換，還是只是單純忘記標註而已。
- 總是難以搞清楚到底該讓來源型別或目的型別提供轉換，如果兩邊都提供了轉換方式，程式碼就變的曖昧不明。
- List 初始化在目的型別不明確時也會遭遇相同問題，特別是在 list 中只有一個元素的時候。

### 我們的決定

型別轉換運算子與接受單一引數的建構子必須在類別的定義中標註 `explicit`。 一個例外是，複製與轉移建構子不應該是 `explicit`，因為他們並不會進行型別轉換。 隱性轉換在某些時候可以是必要的且對設計為透明包裝其他型別的型別來說是適當的。 對於這種情況請聯絡你的專案領導人來請求免去這個限制。

對於無法使用單一引數呼叫的建構子來說可以省略 `explicit`。 只接受單一 `std::initializer_list` 引數的建構子也應該省略 `explicit`，這樣才能支援複製初始化 (copy-initalization, 例如：`MyType m = {1, 2}'`)。
