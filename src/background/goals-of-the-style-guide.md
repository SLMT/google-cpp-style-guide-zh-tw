## 風格指引的目標

為什麼會有這份文件？

這邊有幾個核心目標是我們相信這份文件該提供的。 這些目標是所有規則的根本依據。 藉由提出這些想法，我們希望透過明確呈現這些理念，讓大家理解這些規則存在的原因，以及某些決策背後的考量。 如果你能了解每個規則是為了甚麼目標而制定，那大家應該也應該更清楚何時某些規定可以豁免（確實有些可以），以及要修改本指南的一條規定時該做出哪些爭論與考量。

這份文件的目標目前我們認為有以下幾點：

### 規則需要具有足夠的份量

一條風格規則所帶來的好處必須大到足夠合理來要求我們的工程師記住它。 它的好處是以沒有這份指南的情況下撰寫出的程式碼為準來衡量的。 有些規則可能在一些極端不好的程式碼中具有些微的好處，但是這種程式碼一般人不太可能會寫得出來的話，我們就不會寫進這份指引。 這個原則解釋了大多數我們沒有寫進的規則。 舉例來說，`goto` 違反了下面很多條原則，但是現在已經很少見了，因此這份風格指引就不討論它。

### 優化的對象應該是程式碼的讀者，而非撰寫者

我們預計我們的程式碼庫 (以及大多數提交到上面的各個組件) 會持續維護很長的一段時間。 因此大多數的時間會花在讀懂它，而非撰寫它。 我們明確選擇優先考量工程師在閱讀、維護與除錯程式碼時的體驗，而非撰寫的便利性。 「為讀者留下足跡」正是一種在這個原則之下常見的觀點：如果在一段程式碼中正在發生一些驚喜或者不尋常的事情 (例如：轉移一個指標的所有權)，在這裡留下一些文字上的提示將會非常有價值。 (`std::unique_ptr` 明確地在呼叫處提示了所有權轉移的行為)。

### 與現有的程式碼保持一致

在我們程式庫中使用一致的風格讓我們可以專注在其他 (更重要) 的問題。 一致性也促進了自動化：例如格式化工具或 `#include` 調整工具，只有在程式碼符合預期的一致性時才能正常運作。 在許多情況下，那些被歸類為「保持一致性」的規則，實際上是在說「選一個標準並遵循它，別再糾結」。 在那些情形允許彈性的潛在好處其實大於大家在那邊爭論所花費的時間。 然而，一致性也有其局限性：當沒有明確的技術論點，或缺乏長期發展方向時，它可以作為決策的參考，但也僅限於應用在局部範圍內（例如單個檔案，或一組緊密相關的介面）。 要注意一致性不應成為忽視新風格優勢或阻礙程式碼轉向新風格的理由。

### 適時與更大的 C++ 社群保持一致

跟其他組織使用 C++ 的方式保持一致所帶來的價值與在我們自己的程式庫中保持一致的理由是相同的。 如果一個 C++ 標準的特性可以解決一個問題，或者一個寫法被廣泛所知且接受，那就是一個使用它的有力理由。 然而，有時候這些特性與寫法可能具有某些缺陷，或者並不是我們的程式庫所需要的。 在這類情況下，其實更適合限制或者禁止這些特性。 在某些情形，沒有特別的好處或者足夠的價值讓我們轉換到標準介面上，我們會更傾向於使用我們自己撰寫或者第三方的函式庫。

### 避免令人驚訝或者危險的結構

C++ 有著一些比看起來更令人訝異或者危險的特性。 這份風格指引內的部分限制就是為了要避免掉入這種陷阱裡。 風格指引對於豁免那些限制具有很高的標準，因為放棄那些規則很有可能會對程式的正確性造成很大的風險。

### 避免那些讓我們的一般 C++ 程式設計師認為詭異或者難以維護的結構

有些 C++ 的特性可能一般來說不太適合被使用，因為它們可能常造成一些額外的複雜性。 在一些廣泛被使用的程式碼中可能會適合使用這種特別的結構，因為複雜實作所帶來的好處會被廣泛使用這點放大，而且了解這些複雜東西的代價不需要在寫新一塊程式碼時再度付出一次。 如果有疑問的話，可以向專案領導詢問是否可以豁免這類的規則。 這對我們的程式庫來說尤其重要，因為程式碼的擁有者與團隊成員會隨時間變動，使得長期維護變得更具挑戰性：儘管現在正在使用某段程式碼的每個人都了解它，經過了幾年後也不能保證仍會是如此。

### 在我們的規模下要非常小心

對於一個超過 1 億行以及有著數千位工程師管理的程式庫來說，一個工程師的一些錯誤或者過於簡化的程式碼可能會對許多人造成極大的負擔。 舉例來說，要特別注意不能汙染全域命名空間 (global namespace)：如果大家都把東西放在全域命名空間的話，對於這種具有數億行程式碼的程式庫來說可能會很難避免命名衝突，並使得程式庫難以維護。

### 在必要時優先考量效能優化

雖然有些效能上的優化可能會牴觸這份文件的一些原則，但是對於必要的情況來說還是可接受的。

### 結論

這份文件的用意在於最大化地提供指引與適當的限制。 一如往常，我們盡量讓這些規則符合常識並維持良好的程式風格。 我們特別參考了整個 Google C++ 社群建立起的傳統，而非單獨考量你個人的喜好或者你的團隊。 當你遇到不尋常的結構時，請保持懷疑並謹慎使用：沒有限制它們並不代表你可以忽略它們。 此時請你自行判斷，如果你不太確定，請不要猶豫，立即詢問你的專案領導來取得意見。
