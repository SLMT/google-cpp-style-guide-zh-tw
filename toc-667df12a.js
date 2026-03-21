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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="index.html">本書介紹</a></span></li><li class="chapter-item "><li class="spacer"></li></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="background/index.html">背景</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="background/goals-of-the-style-guide.html">風格指引的目標</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cpp-version.html">C++ 版本</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="header-files/index.html">標頭檔 (Header Files)</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="header-files/self-contained-headers.html">自給自足標頭檔</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="header-files/define-guard.html">#define 保護</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="header-files/include-what-you-use.html">引入你需要的</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="header-files/forward-declarations.html">前向宣告</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="header-files/inline-functions.html">行內函式</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="header-files/names-and-order-of-includes.html">#include 時的名稱與順序</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="scoping/index.html">作用域 (Scoping)</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="scoping/namespaces.html">名稱空間</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="scoping/internal-linkage.html">內部鏈結</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="scoping/nonmember-static-members.html">非成員、靜態成員、全域函式</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="scoping/local-variables.html">區域變數</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="scoping/static-and-global-variables.html">靜態與全域變數</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="scoping/thread-local-variables.html">thread_local 的變數</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="classes/index.html">類別 (Classes)</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="classes/doing-work-in-constructor.html">在建構子內工作</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="classes/implicit-conversions.html">隱性轉換</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="classes/copyable-and-movable-types.html">可複製與可轉移的型別</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="classes/structs-vs-classes.html">結構與類別的比較</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="classes/struct-vs-paris-and-tuples.html">結構與結構與對和元組的比較</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="classes/inheritance.html">繼承</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><span>🚧 運算子多載</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="classes/access-control.html">🚧 存取控制</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><span>🚧 宣告順序</span></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><span>🚧 函式 (Functions)</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><span>🚧 Google 特有的魔術</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="other-cpp-features/index.html">🚧 其他 C++ 特性</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="other-cpp-features/exceptions.html">🚧 例外</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="other-cpp-features/template-metaprogramming.html">🚧 模板元程式設計</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="other-cpp-features/alias.html">🚧 別名</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="other-cpp-features/preprocessor-marcos.html">🚧 預處理器巨集</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="naming/index.html">命名 (Naming)</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="naming/choosing-names.html">選擇名稱</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="naming/file-names.html">檔案名稱</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="naming/type-names.html">型別名稱</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="naming/concept-names.html">概念名稱</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="naming/variable-names.html">變數名稱</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="naming/constant-names.html">常數名稱</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="naming/function-names.html">函數名稱</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="naming/namespace-names.html">名稱空間名稱</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="naming/enumerator-names.html">列舉器名稱</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="naming/template-parameter-names.html">模板參數名稱</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="naming/macro-names.html">巨集名稱</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="naming/aliases.html">別名</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="naming/exceptions-to-naming-rules.html">名稱規則的例外</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><span>🚧 註解</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><span>🚧 排版</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><span>🚧 規則中的例外</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><span>🚧 結尾贈言</span></span></li><li class="chapter-item "><li class="spacer"></li></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="english-word-table.html">附錄：中英文名詞對照</a></span></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            if (link.href === current_page
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                const clientRect = e.target.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                sessionStorage.setItem('sidebar-scroll-offset', clientRect.top - sidebarRect.top);
            }
        }, { passive: true });
        const sidebarScrollOffset = sessionStorage.getItem('sidebar-scroll-offset');
        sessionStorage.removeItem('sidebar-scroll-offset');
        if (sidebarScrollOffset !== null) {
            // preserve sidebar scroll position when navigating via links within sidebar
            const activeSection = this.querySelector('.active');
            if (activeSection) {
                const clientRect = activeSection.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                const currentOffset = clientRect.top - sidebarRect.top;
                this.scrollTop += currentOffset - parseFloat(sidebarScrollOffset);
            }
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);

