## 變數名稱 (Variable Names)

> 變數 (包含函式的參數) 與資料成員的名稱都用蛇形命名法（`snake_case`，也就是全部小寫，並使用底線隔開單字）。 類別的資料成員（但結構的資料成員不包括在內）還需在名稱尾端加上底線。 例如，區域變數：`a_local_variable`、結構資料成員：`a_struct_data_member`、類別資料成員：`a_class_data_member_`。

### 一般變數名稱

好的：

```cpp
string table_name;  // 可以 - 蛇形命名法
```

不好的：

```cpp
string tableName;   // 不好 - 大小寫混合
```

### 類別資料成員

類別的資料成員（無論是靜態或非靜態）應像一般的非成員變數一樣命名，但要加上尾端底線。 唯一的例外是靜態常數類別成員，應該要以 [常數的方式](constant-names.md) 命名。

```cpp
class TableInfo {
 public:
  ...
  static const int kTableVersion = 3;  // 可以 - 常數命名方式
  ...

 private:
  std::string table_name_;             // 可以 - 尾端有底線
  static Pool<TableInfo>* pool_;       // 可以
};
```

### 結構資料成員

結構的資料成員（無論是靜態或非靜態）應像一般的非成員變數一樣命名。 不像類別的資料成員，它們不需加上尾端底線。

```cpp
struct UrlTableProperties {
  std::string name;
  int num_entries;
  static Pool<UrlTableProperties>* pool;
};
```

請參考 [結構與類別章節](../classes/structs-vs-classes.md) 的討論來瞭解何時該使用結構而不是類別。
