# Google C++ Style Guide 繁體中文版

[![Deploy](https://github.com/SLMT/google-cpp-style-guide-zh-tw/actions/workflows/deploy.yaml/badge.svg)](https://github.com/SLMT/google-cpp-style-guide-zh-tw/actions/workflows/deploy.yaml)

本書翻譯了 Google 官方訂定的 Coding Style (程式碼風格) 標準。

如果程式碼都能夠遵照同一份標準來撰寫的話，就能夠大大地增加程式的可讀性。 Google 所訂定的 C++ 程式碼風格非常明確，也非常仔細。 我認為是一個很不錯的標準。

不過可惜的是，Google 官方只有提供英文版的說明。 為了讓不善英文，並使用中文的人能夠理解文件的內容，特別翻譯本書供大家閱讀。

## 注意：本書正在更新到 2025 年版

本書自從 2021 年之後因為作者的私人原因沒有把翻譯完成。 在這段期間 Google 風格指南又經歷了多次修改，特別是參照的 C++ 版本從 C++11 版直接跳躍到 C++20。 同時也在規則中加入了許多 Abseil Library 的 [C++ Tips of The Week][7] 作為參考資料。

為了夠讓本中文版指南能夠跟上時代，作者正在積極校對與更新之前已翻譯的內容，同時也會盡快完成剩餘未完成的翻譯。

如果想要瞭解本指南的翻譯更新進度，請參考 GitHub 上的 [這個 issue][8]。

## 連結

- 本書的 Github Repository：[https://github.com/SLMT/google-cpp-style-guide-zh-tw][1]
- 線上電子書網址：[https://www.slmt.tw/google-cpp-style-guide-zh-tw/][2]
- Google 官方 C++ Style 說明文件 (英文)：[https://google.github.io/styleguide/cppguide.html][3]

## 回報與修正

如果覺得哪裡翻譯有誤，或者覺得語句不通順，歡迎到 Github repository 的 [issue][4] 提出問題。 如果熟悉 Git 的話，也歡迎在 Github 上 fork 這個 repository 自行修改，並開啟 pull request 請求合併。

## 一些撰寫時的規則

- 所有文句除標題外，一律以句號結尾。
- 句號之後若還有其他語句在同一段，一律加上一個半形空白。
- 英文單字與中文字詞的銜接處一律加上一個半形空白。

## 英文專有名詞的處理

這點我想了很久，有些程式中的關鍵字像是 class 或者 function 之類的，到底該使用中文的翻譯名詞呢？還是直接打英文名詞？

使用中文專有名詞的好處是，對於直接從中文教材學習的人來說，很快就可以進入狀況。 不過有可能我翻譯的名詞與這些人當初所學的不同，這樣或許也沒有好處。 而且對於本來就學英文的人來說，一下子看到中文名詞可能很難進入狀況。 事實上，我個人平常是中英文夾雜使用的。 遇到專有名詞就切換成英文，一般解釋時就用中文。 但是無論如何，我必須要訂出一個統一的標準貫穿本書，以方便讀者閱讀。

我想來想去，覺得這本書主要的目還是在於翻譯。因此除了程式碼的部分外，盡量少用英文名詞較好。 所以我最後的方針是：

> 除非是非得使用英文的情況，不然程式的專有名詞一律翻譯成中文。 少見名詞第一次出現時，在旁標明英文。 常用的名詞則直接使用中文翻譯。

為了方便只知道英文名詞的人能夠查閱看不懂翻譯的名詞，我在附錄列了一張[中英專有名詞的對照表](src/english-word-table.md)。 希望多少有點幫助。

[1]: https://github.com/SLMT/google-cpp-style-guide-zh-tw
[2]: https://www.slmt.tw/google-cpp-style-guide-zh-tw/
[3]: https://google.github.io/styleguide/cppguide.html
[4]: https://github.com/SLMT/google-cpp-style-guide-zh-tw/issues
[5]: https://github.com/google/styleguide/blob/63107a12eb85a4da33e2585a912234e4794cea06/cppguide.html
[6]: https://github.com/google/styleguide/
[7]: https://abseil.io/tips/
[8]: https://github.com/SLMT/google-cpp-style-guide-zh-tw/issues/7
