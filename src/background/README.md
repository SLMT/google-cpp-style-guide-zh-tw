# 背景

C++ 是許多 Google 開源專案中主要使用的程式語言之一。 如同許多 C++ 程式設計師所知，C++ 具有許多強大的特性，但這種強大也帶來了複雜性，使得程式碼容易產生各種錯誤 (Bug)，並且也難以閱讀及維護。

本指南的目標在於藉由詳細說明哪些東西該寫、哪些不該寫，來管理 C++ 程式碼的複雜度。 這些規則存在的目的即是讓程式碼保持易於維護的同時，也讓開發者能有效地發揮 C++ 的特性。

風格 (Style)，也稱作可讀性 (Readability)，即是我們用來管理 C++ 程式碼中遵循的慣例。 事實上，用 Style 這個字眼可能不太精確，因為這類約定並非只有著墨在程式碼的排版。

Google 開發的絕大多數開源專案都遵循本指南。

請注意：本指南並非 C++ 教學，我們假設讀者已熟悉這門程式語言。
