## `thread_local` 變數

> 對於不是在 function 內宣告的 `thread_local` 變數，一定要以真編譯期常數 (true compile-time constant) 來初始化，這一點必須透過 [`constinit`](https://en.cppreference.com/w/cpp/language/constinit) 屬性來強制執行。 偏好使用 `thread_local` 來定義執行緒內資料 (thread-local data)。

### 定義

變數可以在宣告時加上 `thread_local` 修飾詞：

```cpp
thread_local Foo foo = ...;
```

這類變數實際上是多個物件的集合，因此當不同的執行緒存取它時，實際上是在存取不同的物件。 `thread_local` 變數其實在很多方面與 [靜態儲存期變數](static-and-global-variables.md) 很接近。 舉例來說，它們可以被宣告在命名空間的作用域、函式內部、或是做為類別的靜態成員，但不能做為一般類別的成員。

`thread_local` 變數的初始化很像靜態變數的作法，只差在它們必須在每個執行緒裡面分別初始化，而不是在程式啟動時一次初始化。 這代表著那些在函式內宣告的 `thread_local` 變數很安全，但是其他的 `thread_local` 變數則會像靜態變數一樣遭遇初始化順序的問題 (以及其他更多問題)。

`thread_local` 變數有一個微妙的解構順序問題： 在執行緒結束的時候，`thread_local` 變數會依照他們被初始化的相反順序進行解構 (在 C++ 通常是這樣)。 如果發生任何被解構函式觸動的程式碼參考了任何該執行緒內已經被銷毀的 `thread_local` 變數，那對我們來說會變得很難去分析釋出後使用 (use-after-free) 的問題。

### 優點

- 執行緒內資料從本質上來說不會受到資料競爭 (data race) 影響 (因為只有一個執行緒可以存取)，這點讓 `thread_local` 對並行程式設計很有幫助。
- `thread_local` 是唯一標準用來建立執行緒內變數 (thread-local variables) 的方式。

### 缺點

- 在執行緒啟動或者初次存取 `thread_local` 的變數時，可能會觸發無法預測且數量不可控的額外程式碼執行。
- `thread_local` 變數本質上與全域變數無異，因此它具有全域變數的所有缺點，唯一的例外是它是執行緒安全的 (thread safe)。
- `thread_local` 變數帶來的記憶體消耗會隨著執行緒數量增加而變大，有可能會造成很大的負擔。
- 一般類別的成員除非是 `static`，不然就不能是 `thread_local`。
- 如果 `thread_local` 變數有很複雜的解構函式，那可能會遭遇到釋出後使用 (use-after-free) 的問題。 特別是這類變數的解構函式不得間接或直接存取任何可能已被銷毀的 `thread_local` 資料。 但這件事情也很難被強制。
- 對於防範全域或靜態資料發生釋出後使用問題的方法並無法用在 `thread_local` 資料上。 確切來說，我們可以允許略過全域或靜態變數的解構函數，因為他們的生存期止於程式結束。 因此，任何洩漏問題會由作業系統的資源與記憶體清理機制進行處理。 相反地，在程式執行中結束的執行緒若是略過 `thread_local` 變數的解構函式的話，可能會導致資源洩漏，其規模與程式執行期間終止的執行緒總數成正比。

### 決定

對於類別與名稱空間作用域內的 `thread_local` 變數，一定要以真編譯期常數 (true compile-time constant) 來初始化 (換言之，他們不能用動態初始化)。 為了要強制這點，類別與名稱空間作用域內的 `thread_local` 變數一定要標註 [`constinit`](https://en.cppreference.com/w/cpp/language/constinit) (或是 `constexpr`，但須盡量少用)：

```cpp
constinit thread_local Foo foo = ...;
```

定義在函式內的 `thread_local` 變數沒有初始化疑慮，但在執行緒結束時可能會有釋出後使用 (use-after-free) 的問題。 注意你可以利用定義一個會回傳 `thread_local` 變數的函式或靜態方法，來使用函式作用域等級的 `thread_local` 變數，以模擬類別或是命名空間作用域等級的 `thread_local`：

```cpp
Foo& MyThreadLocalFoo() {
  thread_local Foo result = ComplicatedInitialization(); // 函式名稱：很複雜的初始化
  return result;
}
```

注意 `thread_local` 變數會在執行緒結束時銷毀。 如果任何此類變數的解構函式用到其他可能被摧毀的 `thread_local` 變數，都可能會造成難以診斷的釋出後使用錯誤。 因此，宣告 `thread_local` 變數時應優先選擇簡單型別 (trivial type)，或確保在解構時不會執行使用者提供的程式碼，以降低誤用已刪除的 `thread_local` 變數的風險。

應優先使用 `thread_local` 來定義執行緒內資料。
