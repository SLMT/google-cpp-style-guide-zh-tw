## 函數名稱 (Function Names)

> 一般函式應使用大小寫混合命名法 (mixed case)；而存取子 (Accessor) 與修改子 (Mutator) 則可以選擇以變數風格命名。

一般來說，函式應以大寫字母開頭，並在每一個新單字的首字使用大寫字母。

```c++
AddTableEntry()
DeleteUrl()
OpenFileOrDie()
```

(相同的命名規則也適用於類別與名稱空間範圍之中，那些作為 API 的一部分公開的、或是意圖讓其看起來像函數的常數。 因為它們是物件而非函式這一點只是無關緊要的實作細節。)

存取子與修改子 (get 與 set 函式) 可以用變數的方式命名，這些函式的命名通常對應到實際的成員變數，但這並非必要。 例如：`int count()` 與 `void set_count(int count)`。
