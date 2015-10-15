# 標頭檔 (Header Files)

一般來說，每一個 `.cc` 檔都應該要有一個對應的 `.h` 檔。 不過也有一些常見的例外，像是單元測試 (Unit Test) 跟一些只包含著 `main()` 的小型 `.cc` 檔就不需要有。

正確地使用標頭檔可以對可讀性、程式碼大小與效能帶來巨大的影響。

以下這些原則會引領你克服標頭檔中各式各樣的陷阱。


## 自給自足標頭檔 (Self-contained Headers)

> 標頭檔應該要自給自足 (self-contained)，而且副檔名必須是 `.h`。 專門用來插入文件的檔案，則應該要使用 `.inc` 作為副檔名。 不允許使用 `-inl.h` 作為標頭檔名結尾。

所有標頭檔都應該要自給自足。 換句話說，使用者或者重構工具並不需要依賴任何額外的條件才能夠插入標頭檔。 更精確地說，標頭檔應該要包含 [`#define` 保護](#define_guard)，而且應該要自己插入所有需要的其他標頭檔，同時也不需要 define (定義)任何額外的 symbols 才能使用。

有幾個少數的狀況下，某些檔案是用來在程式碼的特定位置中插入文件，這些檔案並不需要自給自足。 像是有些檔案會被載入多次，或者這些檔案其實是其他標頭檔中的一些於某平台 (platform-specific) 的擴充。 這種類型的檔案就該使用 `.inc` 作為副檔名。

如果有模板 (template) 或者行內函式 (inline function) 宣告於 `.h` 檔中，那務必也要在同一個檔案內定義它們的內容。 所有使用到這些東西的 `.cc` 檔都應該要載入這些結構，不然在某些建置設定下會造成程式無法連結 (link)。 不要將這些定義移至額外的 `-inl.h` 檔中。

有一個例外是，函式模板 (function template) 的顯式實體化 (explicitly instantiated) 或者該模板是一個類別的私有 (private) 成員的話，可以只定義在實體化該模板的 `.cc` 檔中。


## `#define` 保護 (The `#define` Guard) <a name="define_guard"></a>

> 所有的標頭檔應該要包含 `#define` 保護，以防止多重載入。 其名稱的格式為 `<專案名稱>_<路徑>_<檔名>_H_`。

為了保證名稱的獨特性，應該要遵照該檔案的在專案中的完整路徑來定義。 例如，一個在專案 foo 之中 `foo/src/bar/baz.h` 位置下的檔案，其保護應該要這樣寫：

```c++
#ifndef FOO_BAR_BAZ_H_
#define FOO_BAR_BAZ_H_

...

#endif  // FOO_BAR_BAZ_H_
```


## Forward Declarations

TBT.

## Inline Functions

TBT.

## Names and Order of Includes

TBT.
