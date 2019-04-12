# 標頭檔 (Header Files)

一般來說，每一個 `.cc` 檔都應該要有一個對應的 `.h` 檔。 不過也有一些常見的例外，像是單元測試 (Unit Test) 跟一些只包含著 `main()` 的小型 `.cc` 檔就不需要有。

正確地使用標頭檔可以對可讀性、程式碼大小與效能帶來巨大的影響。

以下這些原則會引領你克服標頭檔中各式各樣的陷阱。