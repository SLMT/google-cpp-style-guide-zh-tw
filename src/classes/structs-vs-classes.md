## 結構 (struct) 與 類別 (class) 的比較

> 只對僅用於承載資料的被動物件使用 `struct`，剩下的都用 `class`。

C++ 中的 `struct` 與 `class` 幾乎相同，不過我們對這些關鍵字賦予了額外的語義，因此你應該要注意對你定義的資料型別賦予適當的關鍵字。

`struct` 應該被用在那些攜帶資料，也可以包含相關常數的被動性物件。 所有的欄位必須是公用的 (`public`)。 `struct` 不該包含暗示不同欄位之間關係的不變條件 (invariant)，因為直接存取那些欄位可能會打破那些不變條件。 建構函式、解構函式與幫手函式可以存在；但這些函式不該要求或強制任何不變條件。

如果需要更多的功能或不變條件，抑或是 `struct` 具有廣泛可見度並且預期會持續演化，那麼使用 `class` 應該更為恰當。 如果有疑慮，就用 `class`。

為了與 STL 保持一致性，你可以對不保存狀態的型別，像是特徵 (trait)、[模板元函式 (template metafunctions)](../other-cpp-features/template-metaprogramming.md) 與一些函子 (functor) 使用 `struct`。

注意 `struct` 與 `class` 的成員變數有著[不同的命名規則](../naming/variable-names.md)。
