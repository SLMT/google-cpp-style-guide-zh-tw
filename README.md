# Google C++ Style Guide 繁體中文版

本書翻譯了 Google 官方訂定的 Coding Style (程式碼風格) 標準。

如果程式碼都能夠遵照同一份標準來撰寫的話，就能夠大大地增加程式的可讀性。 Google 所訂定的 C++ 程式碼風格非常明確，也非常仔細。 我認為是一個很不錯的標準。

不過可惜的是，Google 官方只有提供英文版的說明。為了讓不善英文，並使用中文的人能夠理解文件的內容，特別撰寫本書供大家閱讀。

### 連結

- 本書的 Github Repository：[https://github.com/SLMT/google-cpp-style-guide-zh-tw][1]
- 線上電子書網址：[http://www.slmt.tw/google-cpp-style-guide-zh-tw/][2]
- Google 官方 C++ Style 說明文件 (英文)：[https://google.github.io/styleguide/cppguide.html][3]

### 版本

目前此文的版本為：release-20200815-001

#### 對應的原文版本

請注意原本的 Google C++ Style Guide 也會與時俱進，英文本的內容會不斷修改。 因此這裡標註出此書翻譯時對應的英文版原件：

- 目前本書內容對應到的版本為 Google [官方 Repository][6] [2018/08/15 Commit 的版本][5]

### 需要支援

有些部分我個人覺得翻譯仍不太準確，而且翻得很爛。 例如「背景」那章的「風格指引的目標」下的內容，普遍來說翻譯應該都不太好。 因此我需要大家提供意見幫我改進那邊的翻譯。 基本上就對照中英文看一下，然後開一個 [issue][4] 讓我知道一下怎麼修改會比較好。

### 一些撰寫時的規則

- 所有文句除標題外，一律以句號結尾。
- 句號之後若還有其他語句在同一段，一律加上一個半形空白。
- 英文單字與中文字詞的銜接處一律加上一個半形空白。

### 英文專有名詞的處理

這點我想了很久，有些程式中的關鍵字像是 class 或者 function 之類的，到底該使用中文的翻譯名詞呢？還是直接打英文名詞？

使用中文專有名詞的好處是，對於直接從中文教材學習的人來說，很快就可以進入狀況。 不過有可能我翻譯的名詞與這些人當初所學的不同，這樣或許也沒有好處。 而且對於本來就學英文的人來說，一下子看到中文名詞可能很難進入狀況。 事實上，我個人平常是中英文夾雜使用的。 遇到專有名詞就切換成英文，一般解釋時就用中文。 但是無論如何，我必須要訂出一個統一的標準貫穿本書，以方便讀者閱讀。

我想來想去，覺得這本書主要的目還是在於翻譯。因此除了程式碼的部分外，盡量少用英文名詞較好。 所以我最後的方針是：

> 除非是非得使用英文的情況，不然程式的專有名詞一律翻譯成中文。 少見名詞第一次出現時，在旁標明英文。 常用的名詞則直接使用中文翻譯。

為了方便只知道英文名詞的人能夠查閱看不懂翻譯的名詞，我在附錄列了一張[中英專有名詞的對照表](src/english-word-table.md)。 希望多少有點幫助。

### 回報與修正

如果覺得哪裡翻譯有誤，或者覺得語句不通順，歡迎到 Github repository 的 [issue][4] 提出問題。 如果熟悉 Git 的話，也歡迎在 Github 上 fork 這個 repository 自行修改，並開啟 pull request 請求合併。

[1]: https://github.com/SLMT/google-cpp-style-guide-zh-tw
[2]: http://www.slmt.tw/google-cpp-style-guide-zh-tw/
[3]: https://google.github.io/styleguide/cppguide.html
[4]: https://github.com/SLMT/google-cpp-style-guide-zh-tw/issues
[5]: https://github.com/google/styleguide/blob/63107a12eb85a4da33e2585a912234e4794cea06/cppguide.html
[6]: https://github.com/google/styleguide/
