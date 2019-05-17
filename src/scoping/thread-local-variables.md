## `thread_local` 變數

> 對於不是在 function 內宣告的 `thread_local` 變數，一定要以編譯時期常數來初始化，而且一定要用 [ABSL_CONST_INIT](https://github.com/abseil/abseil-cpp/blob/master/absl/base/attributes.h) 屬性確保這件事。 偏好使用 `thread_local` 來定義線程內的區域變數。

### 定義

從 C++11 開始，變數可以在宣告時加上 `thread_local`：

```c++
thread_local Foo foo = ...;
```

這樣的變數其實是對應到一堆物件的集合。 當不同的線程在存取變數的時候，其實會存取到不同的物件。 `thread_local` 變數其實在很多方面與 [靜態儲存期變數](static-and-global-variables.md) 很接近。 舉例來說，它們可以被宣告在命名空間的作用域、函式內部、或是做為類別的靜態成員，但不能做為一般類別的成員。

`thread_local` 變數的實體的初始化很像靜態變數的作法，只差在它們必須在每個線程裡面分別初始化，而不是在程式啟動時一次初始化。 這代表著那些在函式內宣告的 `thread_local` 變數很安全，但是其他的 `thread_local` 變數則會像靜態變數一樣遭遇初始化順序的問題 (以及其他問題)。

`thread_local` 變數的實體在線程結束時被摧毀，所以他們沒有靜態變數的解構順序問題。

### 優點

- 線程內資料從本質上來說不會受到 data races 影響 (因為只有一個線程可以存取)，這點讓 `thread_local` 對並行程式設計很有幫助。
- `thread_local` 是唯一定義在標準內，用來建立線程內變數 (thread-local variables) 的方式。

### 缺點

- 存取 `thread_local` 的變數可能會觸發執行一些無法預期或是無法控制的程式碼。
- `thread_local` 變數其實就是一個有效的全域變數，所以具備除了線程安全之外的所有全域變數的缺點。
- `thread_local` 變數帶來的記憶體消耗會隨著線程數量增加而增長，有可能會造成程式中很大的負擔。
- 一般類別的成員不能是 `thread_local`。
- `thread_local` 可能不比某些編譯器的內建功能 (compiler intrinsics) 還要有效率。

### 我們的決定

定義在函式內的 `thread_local` 變數沒有安全疑慮，因此可以被無限制的使用。 注意你可以利用定義一個會回傳 `thread_local` 變數的函式或靜態方法，來使用函式作用域等級的 `thread_local` 以模擬類別或是命名空間作用域等級的 `thread_local`：

```cpp
Foo& MyThreadLocalFoo() {
  thread_local Foo result = ComplicatedInitialization(); // 函式名稱：很複雜的初始化
  return result;
}
```

類別或是命名空間作用域等級的 `thread_local` 變數必須使用編譯期就決定的常數來初始化 (也就是說，不能具有任何動態初始化的部分)。 為了要強迫這個限制，類別內或是名稱空間內的 `thread_local` 變數一定要標註 [ABSL_CONST_INIT](https://github.com/abseil/abseil-cpp/blob/master/absl/base/attributes.h) (或是 `constexpr`，但不常用)：

```cpp
ABSL_CONST_INIT thread_local Foo foo = ...;
```

在定義線程內變數 (thread-local variables) 時應優先使用 `thread_local`。