## 常數名稱

> 使用 `constexpr` 或 `const` 宣告的變數，以及數值在整個程式執行期間皆固定的變數，其名稱應該以「k」為開頭，並使用大小寫混和命名法 (mixed case)。 僅在無法用大小寫分隔的少數特殊情況下，才可使用底線分隔。例如：
> ```cpp
> const int kDaysInAWeek = 7;
> const int kAndroid8_0_0 = 24;  // Android 8.0.0
> ```
> 所有具備以上性質同時有靜態儲存期 (例如靜態變數與全域變數，詳情請參照[儲存期](http://en.cppreference.com/w/cpp/language/storage_duration#Storage_duration)) 的變數都應該這樣命名，包括類別中的靜態常數資料成員以及在模板中可能因不同實例而有不同值的成員。 對於其他儲存類別的變數而言，此命名慣例屬於選擇性的 (例如自動變數)，其他情況應使用一般的變數命名規則，例如：
> ```cpp
> void ComputeFoo(absl::string_view suffix) {
>  // 任何一種寫法都可以接受
>  const absl::string_view kPrefix = "prefix";
>  const absl::string_view prefix = "prefix";
>  ...
>}
> ```
> 不好的例子：
> ```cpp
> void ComputeFoo(absl::string_view suffix) {
>  // 不好 - 每次呼叫 `ComputeFoo` 時可能都會產生不同的 `kCombined` 數值
>  const std::string kCombined = absl::StrCat(kPrefix, suffix);
>  ...
>}
>```