## 檔案名稱 (File Names)

> 檔案名稱應該全部使用小寫字母，並可以包含底線 (`_`) 或是橫槓 (`-`)。 關於這點請遵循各專案的慣例。 如果沒有一致可循的本地慣例，偏好使用 `_`。

一些可接受的檔案名稱範例：

- `my_useful_class.cc`
- `my-useful-class.cc`
- `myusefulclass.cc`
- `myusefulclass_test.cc // _unittest 與 _regtest 這兩種寫法已經不再推薦使用`

C++ 檔案應該以 `.cc` 結尾，同時標頭檔應該以 `.h` 結尾。 需要在某個特定位置以文字方式引入的檔案應該以 `.inc` 結尾 (更多請看[自給自足標頭檔](../header-files/self-contained-headers.md)的章節)。

不要使用已經存在於 `/usr/include` 的檔名，像是 `db.h`。

一般來說，應該要讓你的檔案名稱非常精確。 例如，使用 `http_server_logs.h` 而不是 `logs.h`。 一個常見的情況是，當定義名為 `FooBar` 的類別時，通常會有一對檔案分別名為 `foo_bar.h` 與 `foo_bar.cc`。
