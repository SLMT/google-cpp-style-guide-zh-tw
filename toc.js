// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item affix "><a href="index.html">本書介紹</a></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item "><a href="background/index.html">背景</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="background/goals-of-the-style-guide.html">風格指引的目標</a></li></ol></li><li class="chapter-item "><a href="cpp-version.html">C++ 版本</a></li><li class="chapter-item "><a href="header-files/index.html">標頭檔 (Header Files)</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="header-files/self-contained-headers.html">自給自足標頭檔</a></li><li class="chapter-item "><a href="header-files/define-guard.html">#define 保護</a></li><li class="chapter-item "><a href="header-files/include-what-you-use.html">引入你需要的</a></li><li class="chapter-item "><a href="header-files/forward-declarations.html">前向宣告</a></li><li class="chapter-item "><a href="header-files/inline-functions.html">行內函式</a></li><li class="chapter-item "><a href="header-files/names-and-order-of-includes.html">#include 時的名稱與順序</a></li></ol></li><li class="chapter-item "><a href="scoping/index.html">作用域 (Scoping)</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="scoping/namespaces.html">名稱空間</a></li><li class="chapter-item "><a href="scoping/internal-linkage.html">內部鏈結</a></li><li class="chapter-item "><a href="scoping/nonmember-static-members.html">非成員、靜態成員、全域函式</a></li><li class="chapter-item "><a href="scoping/local-variables.html">區域變數</a></li><li class="chapter-item "><a href="scoping/static-and-global-variables.html">靜態與全域變數</a></li><li class="chapter-item "><a href="scoping/thread-local-variables.html">thread_local 的變數</a></li></ol></li><li class="chapter-item "><a href="classes/index.html">類別 (Classes)</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="classes/doing-work-in-constructor.html">在建構子內工作</a></li><li class="chapter-item "><a href="classes/implicit-conversions.html">隱性轉換</a></li><li class="chapter-item "><a href="work-in-progress.html">🚧 可複製或可轉移的型別</a></li><li class="chapter-item "><a href="classes/structs-vs-classes.html">🚧 Struct 與 Class 的比較</a></li><li class="chapter-item "><a href="work-in-progress.html">🚧 繼承</a></li><li class="chapter-item "><a href="work-in-progress.html">🚧 運算子多載</a></li><li class="chapter-item "><a href="work-in-progress.html">🚧 存取控制</a></li><li class="chapter-item "><a href="work-in-progress.html">🚧 宣告順序</a></li></ol></li><li class="chapter-item "><a href="work-in-progress.html">🚧 函式 (Functions)</a></li><li class="chapter-item "><a href="work-in-progress.html">🚧 Google 特有的魔術</a></li><li class="chapter-item "><a href="other-cpp-features/index.html">🚧 其他 C++ 特性</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="other-cpp-features/exceptions.html">🚧 例外</a></li><li class="chapter-item "><a href="other-cpp-features/preprocessor-marcos.html">🚧 預處理器巨集</a></li></ol></li><li class="chapter-item "><a href="naming/index.html">命名 (Naming)</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="naming/choosing-names.html">選擇名稱</a></li><li class="chapter-item "><a href="naming/file-names.html">檔案名稱</a></li><li class="chapter-item "><a href="naming/type-names.html">型別名稱</a></li><li class="chapter-item "><a href="naming/variable-names.html">變數名稱</a></li><li class="chapter-item "><a href="naming/constant-names.html">常數名稱</a></li><li class="chapter-item "><a href="naming/function-names.html">函數名稱</a></li><li class="chapter-item "><a href="naming/namespace-names.html">名稱空間名稱</a></li><li class="chapter-item "><a href="naming/enumerator-names.html">列舉器名稱</a></li><li class="chapter-item "><a href="naming/macro-names.html">巨集名稱</a></li><li class="chapter-item "><a href="naming/exceptions-to-naming-rules.html">名稱規則的例外</a></li></ol></li><li class="chapter-item "><a href="work-in-progress.html">🚧 註解</a></li><li class="chapter-item "><a href="work-in-progress.html">🚧 排版</a></li><li class="chapter-item "><a href="work-in-progress.html">🚧 規則中的例外</a></li><li class="chapter-item "><a href="work-in-progress.html">🚧 結尾贈言</a></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item affix "><a href="english-word-table.html">附錄：中英文名詞對照</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
