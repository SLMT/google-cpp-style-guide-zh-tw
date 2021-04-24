# 列舉器名稱

> 列舉器的值 (無論是否有限定範圍) 都應該要以[常數](constant-names.md)或者[巨集](macro-names.md)的方式命名：像是 `kEnumName` 或 `ENUM_NAME`。

可以的話，列舉器的值傾向於用[常數](constant-names.md)的方式命名，不過使用[巨集](macro-names.md)的方式也是可以接受的。 列舉器本身的名稱，例如 `UrlTableErrors` (與 `AlternateUrlTableErrors`)，是一種型別，因此使用大小寫混和的命名方式。

```c++
enum UrlTableErrors {
  kOK = 0,
  kErrorOutOfMemory,
  kErrorMalformedInput,
};
enum AlternateUrlTableErrors {
  OK = 0,
  OUT_OF_MEMORY = 1,
  MALFORMED_INPUT = 2,
};
```

到 2009 年一月前，這個指引寫著應該要以[巨集](macro-names.md)的方式命名。 這造成了列舉器的值與巨集的名稱衝突問題。 因此才改成了建議使用常數命名法。 新的程式碼應該在可以的時候皆使用常數命名法。 然而目前也沒有理由要把舊程式碼也改成常數命名法，除非舊程式碼造成了編譯時期的問題。
