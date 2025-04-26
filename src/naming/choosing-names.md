## 選擇名稱 (Choosing Names)

> 為事物命名時，應使其目的與意圖對讀者而言清晰易懂，即使是來自不同團隊的讀者也能理解。 不必在意節省橫向空間，因為讓程式碼能被新讀者立即理解更為重要。

考慮該名稱可能被使用的情境。 名稱應該具有描述性，即使它會在離其定義處很遠的地方被使用，然而名稱不應重複當下語境中已經明示的資訊。 一般而言，名稱的描述性應該與其可見範圍成正比。 例如定義在標頭檔中的自由函式名稱可能會包含標頭檔所屬的函式庫名稱，而區域變數則不需要解釋它所屬的函式。

盡量減少使用對專案外的人來說可能不熟悉的縮寫（特別是縮寫成首字母的縮略字）。 不要透過刪除單字中的字母來產生縮寫。 如果要使用縮寫，偏好將縮寫視作單一單字並只將首字母大寫 (像是 `StartRpc()`，而不是 `StartRPC()`)。 有一個原則是，一個縮寫如果有被列在維基百科 (Wikipedia) 上的話，應該也可以接受。 注意有些普遍知道的縮寫是可以接受的，像是 `i` 作為疊代 (iteration) 次數以及 `T` 作為模板 (template) 參數。

你最常會看到的名稱與大多數名稱不同，極少數的「詞彙」名稱被廣泛重複使用，因此它們總是出現在適當語境中。 這些名稱傾向於很短或者甚至是縮寫，而他們完整的意思常來自於明確且完整的長篇文件而非僅靠名稱定義旁的註解或名稱本身的詞語來理解。 像是 `absl::Status` 在開發文件中有一個 [專門的頁面](https://abseil.io/docs/cpp/guides/status) 說明它正確的用法。 你大概不會很常定義新的詞彙名稱，但如果有的話，記得進行額外的設計審查，以確保該名稱在廣泛使用時仍保持合適。

好的例子：

```cpp
class MyClass {
 public:
  int CountFooErrors(const std::vector<Foo>& foos) {
    int n = 0;  // 在有限的作用域與上下文中意圖明顯
    for (const auto& foo : foos) {
      ...
      ++n;
    }
    return n;
  }
  // 函式的註解不需解釋這個函式在錯誤時會回傳 non-OK 狀態，因為 `absl::Status` 
  // 本身就自帶這個意思。 但可以用來記錄某些特定錯誤碼的行為。
  absl::Status DoSomethingImportant() {
    std::string fqdn = ...;  // 這是 "Fully Qualified Domain Name" 的常見縮寫
    return absl::OkStatus();
  }
 private:
  const int kMaxAllowedConnections = ...;  // 在上下文中意圖明顯
};
```

不好的例子：

```cpp
class MyClass {
 public:
  int CountFooErrors(const std::vector<Foo>& foos) {
    int total_number_of_foo_errors = 0;  // 在有限作用域與上下文中顯得太冗長了
    for (int foo_index = 0; foo_index < foos.size(); ++foo_index) {  // 建議使用慣用的 `i`
      ...
      ++total_number_of_foo_errors;
    }
    return total_number_of_foo_errors;
  }
  // `Result` 這個名稱過於通用，若無廣泛教學則難以理解其含義
  Result DoSomethingImportant() {
    int cstmr_id = ...;  // 這種寫法刪除了單字內部的字母
  }
 private:
  const int kNum = ...;  // 在這個較大的作用範圍內，這個名稱的意圖不明
};
```
