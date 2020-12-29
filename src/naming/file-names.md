# 檔案名稱

> 檔案名稱應該完全使用小寫，並可以包含底線 (`_`) 或是橫槓 (`-`)。 關於這點請遵循各專案的慣例。 如果沒有可以遵循且一致的本地模式，偏好使用 `_`。

一些可接受的檔案名稱範例：

- `my_useful_class.cc`
- `my-useful-class.cc`
- `myusefulclass.cc`
- `myusefulclass_test.cc // _unittest 與 _regtest 兩種寫法都過時了`

C++ 檔案應該以 `.cc` 結尾，同時標頭檔應該以 `.h` 結尾。 依賴於在某個特定位置被文字引入的檔案應該以 `.inc` 結尾 (更多請看[自給自足標頭檔](../header-files/self-contained-headers.md)的章節)。

不要使用已經存在於 `/usr/include` 的檔名，像是 `db.h`。

一般來說，應該要讓你的檔案名稱非常精確。 例如，使用 `http_server_logs.h` 而不是 `logs.h`。 一個常見的狀況是使用相同名稱為一對檔案命名，像是 `foo_bar.h` 與 `foo_bar.cc` 定義了名為 `FooBar` 的類別。
