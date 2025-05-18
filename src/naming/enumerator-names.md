## 列舉器名稱 (Enumerator Names)

> 列舉器的值 (無論是否有限定作用域) 都應該要以[常數](constant-names.md)方式命名，不可以用[巨集](macro-names.md)的方式；也就是像是 `kEnumName` ，不可以像是 `ENUM_NAME`。

範例：

```cpp
enum class UrlTableError {
  kOk = 0,
  kOutOfMemory,
  kMalformedInput,
};
```

不好的例子：

```cpp
enum class AlternateUrlTableError {
  OK = 0,
  OUT_OF_MEMORY = 1,
  MALFORMED_INPUT = 2,
};
```

到 2009 年一月前，這個指引寫著應該要以[巨集](macro-names.md)的方式命名。 這導致列舉值與巨集名稱之間產生衝突。 因此才改成了建議使用常數命名法。 新的程式碼應該皆使用常數命名法。
