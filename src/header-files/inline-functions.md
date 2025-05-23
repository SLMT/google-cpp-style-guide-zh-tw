## 行內函式 (Inline Functions)

> 當函式程式碼較少 (少於或等於 10 行時)，可以考慮將它宣告為行內函式。

### 定義

透過宣告函式為行內函式，可以讓編譯器直接在呼叫該函式的地方展開函式，而不是遵照一般的函式呼叫機制。

### 優點

若函式足夠小，行內化可以幫助產生更有效率的目的碼 (object code)。 你可以盡量將存取函式 (accessor) 、修改函式 (mutator) 以及一些極短但對效能有巨大影響的函式行內化。

### 缺點

過度使用行內函式可能會造成程式變慢。 依照函式長度的不同，行內化可能會增加或減少程式碼的大小。 行內化一個很小的存取函式通常可以縮小程式碼體積，而行內化一個較大的函式則可能會大幅增加程式碼的大小。 現代的處理器因為可以更有效率地使用指令快取 (instruction cache)，處理較短的程式碼通常會更快。

### 決定

一個適當的規則是不要將 10 行以上的函式行內化。 需要特別注意解構函式 (destructors)，它們往往比表面上看到的更長，因為還包含了隱含的基底類別 (base class) 與成員解構函式的呼叫。

另一個有用的規則： 一般來說將一個具有迴圈或者 `switch` 的函式行內化 (除非大多數的情況下這個迴圈或 `switch` 都不會被執行)，通常不是有效率的做法。

還有一個重要的須知：就算將一個函式宣告為行內函式，編譯器也不一定會照做。 例如：虛擬函式 (virtual function) 或遞迴函式 (recursive function) 一般不會被行內化。 遞迴函式通常不應該行內化。 至於將虛擬函式寫成行內函式的理由，通常只是為了方便將函式的定義放在類別內，或是用來記錄其行為，例如存取函式與修改函式。

### 譯註三：行內函式範例

這邊提供一個行內函式的範例，主要是透過 `inline` 關鍵字將函式行內化：

```c++
inline int sum(int a, int b) {
	return a + b;
}
```
