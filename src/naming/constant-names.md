# 常數名稱

> 使用 `constexpr` 或 `const` 宣告的變數，以及在程式全期數值皆是固定的變數，其名稱應該以「k」為開頭，並使用大小寫混和的寫法。 底線可以用在少數無法使用大小寫明確分開的場合。例如：
> ```c++
> const int kDaysInAWeek = 7;
> const int kAndroid8_0_0 = 24;  // Android 8.0.0
> ```
> 所有具備以上性質同時有靜態儲存期 (例如靜態變數與全域變數，詳情請參照[儲存期](http://en.cppreference.com/w/cpp/language/storage_duration#Storage_duration)) 的變數都應該這樣命名。 這項慣例對其他儲存種類的變數來說是選擇性的 (例如自動變數)，其他情況應使用一般的變數命名規則。
