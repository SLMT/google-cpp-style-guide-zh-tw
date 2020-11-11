## 通用命名規則 (General Naming Rules)

> 命名應該要具有敘述的能力；避免使用縮寫。

讓一個名稱具有越清楚的描述越好，包括原因在內。 不要去想節省橫向的空間，因為讓你的程式碼能夠被新讀者馬上讀懂這事重要得多。 不要使用會讓專案以外的讀者看起來曖昧不明的縮寫，以及不要利用刪除一個單詞之間的字母來製造縮寫。 那些可能對專案外但是具有一些相關領域知識的人來說看得懂的縮寫還算可以接受。 經驗上來說，一個縮寫如果有被列在維基百科 (Wikipedia) 上的話，應該也可以接受。

符合規定：

```cpp
int price_count_reader;    // 不含縮寫
int num_errors;            // 「num」是很廣泛運用的慣例
int num_dns_connections;   // 大部份的人都知道「DNS」代表甚麼
int lstm_size;             // 「LSTM」是機器學習 (Machine Learning) 領域中常見的縮寫
```

違反規定：

```cpp
int n;                     // 沒意義
int nerr;                  // 曖昧的縮寫
int n_comp_conns;          // 曖昧的縮寫
int wgc_connections;       // 只有你的團隊才知道這代表甚麼
int pc_reader;             // 很多東西都可以縮寫成「pc」
int cstmr_id;              // 刪掉了一些中間字母
FooBarRequestInfo fbri;    // 這根本不是一個字
```

注意有些普遍知道的縮寫是可以接受的，像是 `i` 代表疊代 (iteration) 次數以及 `T` 代表模板 (template) 參數。

對於某些符號，這份指引建議對應的名稱以大寫字母作為開頭，並在每一個單詞的首字都使用大寫字母 (也就是所謂的[駝峰式命名法](https://zh.wikipedia.org/wiki/%E9%A7%9D%E5%B3%B0%E5%BC%8F%E5%A4%A7%E5%B0%8F%E5%AF%AB))。 在這種名稱中如果出現縮寫或者首字型縮寫 (acronyms, 譯註：指的是用每個單字的第一個字母組成的縮寫) 的話，偏好將該縮寫或首字型縮寫視為一個單詞來處理 (像是 `StartRpc()`，而不是 `StartRPC()`)。

模板參數應該要遵從所屬種類的命名風格：型別模板參數應該遵從[型別名稱](type-names.md)的規則，以及非型別模板參數應該要遵從[變數名稱](variable-names.md)的規則。
