## 在建構函式內的工作

> 避免在建構函式內呼叫虛擬函式，而且避免在你無法送出錯誤訊號的時候進行一些可能失敗的初始化工作。

### 定義

建構函式內有可能會執行任意的初始化動作。

### 優點

- 不需要擔心類別是否已經初始化了。
- 已經經過建構函式充分初始化的物件可以作為 `const` 使用，而且與標準容器與演算法使用時更容易。

### 缺點

- 如果在建構函式內呼叫虛擬函式，這些呼叫並不會如預期般地分配給衍伸類別內的實作。 就算你的類別現在還沒被繼承，未來針對你的類別的修改可能會默默地造成這種問題，並產生更多疑惑。
- 沒有除了直接讓程式崩潰 (不是一直都是個好辦法) 或使用 Exception (被我們禁止了) 之外的簡單方法可以讓建構函式送出錯誤訊息。
- 如果工作失敗了，那我們此時就會有個初始化失敗的物件。 這個時候我們可能會需要一個像是 `bool IsValid()` 的方法來檢查狀態，但是大家常會忘記要呼叫它。
- 你無法取得建構函式的記憶體位址，所以建構函式中的工作無法簡單地被移交，例如交給另一個執行緒。

### 我們的決定

建構函式內部應該永遠不要呼叫虛擬函式。 如果你覺得合適的話，也許可以終止程式可以當作一種回報錯誤的方式。 除此之外，可以考慮像 [TotW #42](https://abseil.io/tips/42) 所述那樣建立工廠方法 (Factory Method) 或者 `Init()` 方法。 避免在那些沒有儲存任何會影響到公用方法 (Public Methods) 的變數的物件中使用 `Init()` 方法 (有這種半建構式的物件存在時很難把程式寫對)。