## 變數名稱 (Variable Names)

> 變數 (包含函式的參數) 與資料成員的名稱全部都使用小寫，並使用底線隔開單字。 類別 (但不包含結構) 的資料成員要另外在尾部加上底線。 例如，區域變數：`a_local_variable`、結構資料成員：`a_struct_data_member`、類別資料成員：`a_class_data_member_`。

### 常見的變數名稱

可以接受的：

```c++
string table_name;  // 可以 - 使用底線
string tablename;   // 可以 - 全部小寫
```

不可接受的：

```c++
string tableName;   // 不好 - 大小寫混合
```

### 類別資料成員

類別資料成員，包括靜態 (`static`) 與非靜態的，都如同一般變數命名，但要在尾端加上底線。

```
class TableInfo {
  ...
 private:
  string table_name_;  // 可以 - 尾端有底線
  string tablename_;   // 可以
  static Pool<TableInfo>* pool_;  // 可以
};
```

### 結構資料成員

類別資料成員，包括靜態 (`static`) 與非靜態的，都如同一般變數命名。 他們不像類別一樣要在尾端加上底線。

```
struct UrlTableProperties {
  string name;
  int num_entries;
  static Pool<UrlTableProperties>* pool;
};
```

請看[結構與類別](../classes/structs-vs-classes.md)章節的討論來瞭解何時該使用結構而不是類別。
