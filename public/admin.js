let adminData = ddLoadStore();
const DD_ADMIN_AUTH_KEY = "doubleDamageAdminAuth";
const DD_ADMIN_LOGIN = "jood";
const DD_ADMIN_PASSWORD = "123qwe123";

const form = document.querySelector("[data-admin-form]");
const saveStatus = document.querySelector("[data-save-status]");
const loginScreen = document.querySelector("[data-login-screen]");
const loginForm = document.querySelector("[data-login-form]");
const loginError = document.querySelector("[data-login-error]");
const editors = {
  categories: document.querySelector("[data-categories-editor]"),
  products: document.querySelector("[data-products-editor]"),
  guides: document.querySelector("[data-guides-editor]"),
  events: document.querySelector("[data-events-editor]"),
  partnersList: document.querySelector("[data-partners-editor]"),
  faq: document.querySelector("[data-faq-editor]"),
  paymentStrip: document.querySelector("[data-payment-editor]"),
  coupons: document.querySelector("[data-coupons-editor]"),
  stats: document.querySelector("[data-stats-editor]"),
  advantages: document.querySelector("[data-advantages-editor]"),
  workSteps: document.querySelector("[data-worksteps-editor]"),
  reviews: document.querySelector("[data-reviews-editor]"),
  visibility: document.querySelector("[data-visibility-editor]"),
};

const VISIBILITY_GROUPS = [
  {
    title: "Шапка",
    items: [
      ["header", "Вся шапка"],
      ["headerNav", "Меню: Главная / Магазин / Новости"],
      ["langSwitch", "Переключатель языков"],
      ["themeToggle", "Кнопка темы"],
      ["telegramHeaderButton", "Кнопка Telegram в шапке"],
      ["adminButton", "Кнопка Админка"],
      ["cartButton", "Кнопка корзины"],
    ],
  },
  {
    title: "Главная",
    items: [
      ["hero", "Первый экран полностью"],
      ["heroEyebrow", "Маленькая подпись над главным заголовком"],
      ["heroTitle", "Главный заголовок"],
      ["heroLead", "Текст под главным заголовком"],
      ["heroCatalogButton", "Кнопка Смотреть каталог"],
      ["heroTelegramButton", "Кнопка Написать в Telegram"],
      ["heroPromo", "Промокод"],
      ["heroTrust", "Три подписи под промокодом"],
      ["heroImage", "Картинка справа"],
      ["paymentStrip", "Блок оплаты под первым экраном"],
      ["stats", "Блок цифр"],
      ["drops", "Горячие предложения"],
      ["advantages", "Наши преимущества"],
      ["homeCategories", "Разделы магазина на главной"],
      ["pages", "Старый блок страниц"],
      ["telegramBlock", "Telegram-блок"],
      ["workSteps", "Как мы работаем"],
      ["reviews", "Отзывы"],
      ["homeNews", "Новости на главной"],
      ["partnerCta", "Блок Стать партнером"],
      ["contact", "Форма заявки"],
      ["faq", "FAQ"],
      ["finalCta", "Финальный CTA"],
      ["footer", "Footer"],
    ],
  },
  {
    title: "Магазин и страницы",
    items: [
      ["shopHero", "Верхний блок магазина"],
      ["shopCategories", "Категории магазина"],
      ["shopFilters", "Фильтры и сортировка"],
      ["shopProducts", "Список товаров"],
      ["shopVipBanners", "VIP-баннеры"],
      ["infoHero", "Верхний блок Новости / События / Партнеры"],
    ],
  },
];

const NEWS_ADMIN_CATEGORIES = [
  ["arbitraj", "Арбитраж"],
  ["kripto", "Криптовалюта"],
  ["marketing", "Маркетинг"],
];

const COUNTRY_FLAG_OPTIONS = [
  ["", "Без флага"],
  ["🇺🇦", "🇺🇦 Украина"],
  ["🇺🇸", "🇺🇸 США"],
  ["🇬🇧", "🇬🇧 Великобритания"],
  ["🇩🇪", "🇩🇪 Германия"],
  ["🇵🇱", "🇵🇱 Польша"],
  ["🇫🇷", "🇫🇷 Франция"],
  ["🇪🇸", "🇪🇸 Испания"],
  ["🇮🇹", "🇮🇹 Италия"],
  ["🇳🇱", "🇳🇱 Нидерланды"],
  ["🇨🇦", "🇨🇦 Канада"],
  ["🇧🇷", "🇧🇷 Бразилия"],
  ["🇹🇷", "🇹🇷 Турция"],
  ["🇮🇳", "🇮🇳 Индия"],
  ["🇯🇵", "🇯🇵 Япония"],
];

const ADMIN_LABELS_RU = {
  fields: {
    id: "ID категории",
    icon: "Иконка",
    name: "Название",
    site: "Ссылка на сайт",
    siteLabel: "Текст кнопки SITE",
    promo: "Промокод",
    price: "Цена",
    stockQty: "Наличие",
    countryFlag: "Флаг страны",
    category: "Категория",
    badge: "Бейдж",
    status: "Статус",
    inStock: "В наличии",
    drop: "Показывать на главной",
    featured: "Акцентная карточка",
    size: "Размер карточки",
    date: "Дата",
    value: "Значение",
    code: "Промокод",
    discount: "Скидка %",
  },
  i18n: {
    title: "Заголовок",
    name: "Название",
    text: "Текст",
    description: "Описание",
    categoryLabel: "Подпись категории",
    status: "Статус",
    excerpt: "Короткое описание",
    body: "Текст статьи",
    location: "Место",
    question: "Вопрос",
    answer: "Ответ",
    label: "Подпись",
  },
  images: {
    categories: "Картинка категории",
    products: "Картинка товара",
    guides: "Обложка новости",
    events: "Картинка события",
    partnersList: "Логотип партнера",
  },
};

ADMIN_LABELS_RU.fields.visible = "Показывать на сайте";
ddFixDeep(VISIBILITY_GROUPS);
ddFixDeep(NEWS_ADMIN_CATEGORIES);
ddFixDeep(ADMIN_LABELS_RU);

function updateAuthView() {
  const authed = localStorage.getItem(DD_ADMIN_AUTH_KEY) === "1";
  document.body.classList.toggle("admin-locked", !authed);
  if (loginScreen) loginScreen.classList.toggle("is-hidden", authed);
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
}

function setStatus(text) {
  if (saveStatus) saveStatus.textContent = typeof ddFixText === "function" ? ddFixText(text) : text;
}

function fixAdminText(root = document.body) {
  if (typeof ddFixText !== "function" || !root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const fixed = ddFixText(node.nodeValue);
    if (fixed !== node.nodeValue) node.nodeValue = fixed;
  });
  document.querySelectorAll("[title], [aria-label], [placeholder]").forEach((node) => {
    ["title", "aria-label", "placeholder"].forEach((attr) => {
      if (!node.hasAttribute(attr)) return;
      const current = node.getAttribute(attr);
      const fixed = ddFixText(current);
      if (fixed !== current) node.setAttribute(attr, fixed);
    });
  });
}

function rawMulti(value) {
  if (value && typeof value === "object") return { ua: value.ua || "", en: value.en || "", ru: value.ru || "" };
  return { ua: value || "", en: "", ru: "" };
}

function field(name) {
  return form?.elements[name];
}

function imagePreview(src) {
  return src ? `<div class="image-preview filled" style="background-image:url('${src}')"></div>` : `<div class="image-preview">Нет картинки</div>`;
}

function categoryOptions(selected) {
  return (adminData.categories || [])
    .map((category) => `<option value="${category.id}" ${category.id === selected ? "selected" : ""}>${ddText(category.title, "ua") || category.id}</option>`)
    .join("");
}

function newsCategoryOptions(selected = "arbitraj") {
  return NEWS_ADMIN_CATEGORIES
    .map(([value, label]) => `<option value="${value}" ${value === selected ? "selected" : ""}>${label}</option>`)
    .join("");
}

function flagOptions(selected = "") {
  return COUNTRY_FLAG_OPTIONS
    .map(([value, label]) => `<option value="${value}" ${value === selected ? "selected" : ""}>${label}</option>`)
    .join("");
}

function normalizeAdminData() {
  adminData.visibility = ddNormalizeVisibility(adminData.visibility);
  adminData.coupons = ddNormalizeCoupons(adminData.coupons);
  adminData.categories = adminData.categories || [];
  adminData.products = adminData.products || [];
  adminData.guides = adminData.guides || [];
  adminData.guides.forEach((item) => {
    item.category ||= "arbitraj";
  });

  const addCategoryIfMissing = (category) => {
    if (!category?.id || adminData.categories.some((item) => item.id === category.id)) return;
    adminData.categories.push(ddClone(category));
  };

  (DD_DEFAULT_DATA.categories || []).forEach(addCategoryIfMissing);

  [...new Set(adminData.products.map((product) => product.category).filter(Boolean))].forEach((id) => {
    if (adminData.categories.some((category) => category.id === id)) return;
    const sample = adminData.products.find((product) => product.category === id);
    adminData.categories.push({
      id,
      icon: (id || "#").slice(0, 2).toUpperCase(),
      image: "",
      title: rawMulti(sample?.categoryLabel || id),
      text: {
        ua: "Розділ товарів",
        en: "Product section",
        ru: "Раздел товаров",
      },
    });
  });
}

function multiInputs(scope, key, value, label, area = false) {
  const data = rawMulti(value);
  return ["ua", "en", "ru"]
    .map((lang) => {
      const attr = `data-${scope}-i18n="${key}" data-lang-field="${lang}"`;
      return area
        ? `<label class="wide">${label} ${lang.toUpperCase()}<textarea ${attr}>${data[lang]}</textarea></label>`
        : `<label>${label} ${lang.toUpperCase()}<input ${attr} value="${data[lang]}" /></label>`;
    })
    .join("");
}

function visibleToggle(item) {
  return `<label class="check-row visibility-inline"><input data-field="visible" type="checkbox" ${item.visible !== false ? "checked" : ""} />Показывать на сайте</label>`;
}

function renderVisibilityEditor() {
  if (!editors.visibility) return;
  adminData.visibility = ddNormalizeVisibility(adminData.visibility);
  editors.visibility.innerHTML = VISIBILITY_GROUPS.map((group) => `
    <article class="admin-card visibility-card">
      <div class="admin-card-title"><strong>${group.title}</strong></div>
      <div class="visibility-list">
        ${group.items.map(([key, label]) => `
          <label class="check-row">
            <input type="checkbox" data-visibility-key="${key}" ${adminData.visibility[key] !== false ? "checked" : ""} />
            ${label}
          </label>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function categoryCard(category, index) {
  const count = (adminData.products || []).filter((product) => product.category === category.id).length;
  return `
    <article class="admin-card category-admin-card" data-row="categories" data-index="${index}">
      <div class="admin-card-title">
        <div>
          <strong>${ddText(category.title, "ua") || category.id}</strong>
          <small>${count} товаров · Главная + Магазин</small>
        </div>
        <button class="danger-button" type="button" data-remove="categories" data-index="${index}">Удалить</button>
      </div>
      ${imagePreview(category.image)}
      <label class="wide">Картинка раздела / логотип<input type="file" accept="image/*" data-image-list="categories" data-index="${index}" data-image-key="image" /></label>
      <div class="admin-card-grid">
        ${visibleToggle(category)}
        <label>ID раздела<input data-field="id" value="${category.id}" placeholder="google" /></label>
        <label>Знак если нет картинки<input data-field="icon" maxlength="4" value="${category.icon || ""}" /></label>
        ${multiInputs("item", "title", category.title, "Название")}
        ${multiInputs("item", "text", category.text, "Описание", true)}
        <label class="wide">Подкатегории строкой<input data-field="subcategories" value="${category.subcategories || ""}" placeholder="GMAIL · HOTMAIL · FIRSTMAIL" /></label>
      </div>
    </article>
  `;
}

function fillContent() {
  Object.entries(adminData.content).forEach(([key, value]) => {
    if (!field(key)) return;
    field(key).value = typeof value === "object" ? ddText(value, "ua") : value || "";
  });
  document.querySelectorAll("[data-content-preview]").forEach((node) => {
    const key = node.dataset.contentPreview;
    node.classList.toggle("filled", Boolean(adminData.content[key]));
    node.style.backgroundImage = adminData.content[key] ? `url('${adminData.content[key]}')` : "";
    node.textContent = adminData.content[key] ? "" : "Нет картинки";
  });
}

function productCard(product, index) {
  return `
    <article class="admin-card" data-row="products" data-index="${index}">
      <div class="admin-card-title">
        <strong>${ddText(product.name, "ua") || "Новый товар"}</strong>
        <div class="admin-actions">
          <button class="cart-button" type="button" data-auto-product="${index}">Автоперевод</button>
          <button class="danger-button" type="button" data-remove="products" data-index="${index}">Удалить</button>
        </div>
      </div>
      ${imagePreview(product.image)}
      <label class="wide">Картинка товара<input type="file" accept="image/*" data-image-list="products" data-index="${index}" data-image-key="image" /></label>
      <div class="admin-card-grid">
        ${visibleToggle(product)}
        ${multiInputs("item", "name", product.name, "Название")}
        ${multiInputs("item", "description", product.description, "Описание", true)}
        ${multiInputs("item", "details", product.details, "Доп. информация на странице товара", true)}
        <label>Цена<input data-field="price" type="number" min="0" value="${product.price}" /></label>
        <label>Количество в наличии<input data-field="stockQty" type="number" min="0" value="${product.stockQty ?? 0}" /></label>
        <label>Флаг страны аккаунта
          <select data-field="countryFlag">${flagOptions(product.countryFlag || "")}</select>
        </label>
        <label>Категория
          <select data-field="category">
            ${categoryOptions(product.category)}
          </select>
        </label>
        <label>Подкатегория товара<input data-field="subcategory" value="${product.subcategory || ""}" placeholder="GMAIL / HOTMAIL / BM / FARM" /></label>
        ${multiInputs("item", "categoryLabel", product.categoryLabel, "Подпись категории")}
        <label>Бейдж<input data-field="badge" maxlength="4" value="${product.badge}" /></label>
        ${multiInputs("item", "status", product.status, "Статус")}
        <label class="check-row"><input data-field="inStock" type="checkbox" ${product.inStock !== false ? "checked" : ""} />В наличии</label>
        <label class="check-row"><input data-field="drop" type="checkbox" ${product.drop ? "checked" : ""} />Показывать в дропах</label>
        <label class="check-row"><input data-field="featured" type="checkbox" ${product.featured ? "checked" : ""} />Акцентная карточка</label>
      </div>
    </article>
  `;
}

function guideCard(item, index) {
  return `
    <article class="admin-card" data-row="guides" data-index="${index}">
      <div class="admin-card-title"><strong>${ddText(item.title, "ua")}</strong><button class="danger-button" type="button" data-remove="guides" data-index="${index}">Удалить</button></div>
      ${imagePreview(item.image)}
      <label class="wide">Заглавная картинка<input type="file" accept="image/*" data-image-list="guides" data-index="${index}" data-image-key="image" /></label>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        <label>Тематика
          <select data-field="category">${newsCategoryOptions(item.category || "arbitraj")}</select>
        </label>
        ${multiInputs("item", "title", item.title, "Заголовок")}
        ${multiInputs("item", "excerpt", item.excerpt, "Короткое описание", true)}
        ${multiInputs("item", "body", item.body, "Текст статьи", true)}
        <label>Размер карточки<select data-field="size"><option value="medium" ${item.size === "medium" ? "selected" : ""}>medium</option><option value="large" ${item.size === "large" ? "selected" : ""}>large</option></select></label>
      </div>
    </article>
  `;
}

function eventCard(item, index) {
  return `
    <article class="admin-card" data-row="events" data-index="${index}">
      <div class="admin-card-title"><strong>${ddText(item.title, "ua")}</strong><button class="danger-button" type="button" data-remove="events" data-index="${index}">Удалить</button></div>
      ${imagePreview(item.image)}
      <label class="wide">Картинка події<input type="file" accept="image/*" data-image-list="events" data-index="${index}" data-image-key="image" /></label>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        ${multiInputs("item", "title", item.title, "Название")}
        <label>Дата<input data-field="date" type="date" value="${item.date || ""}" /></label>
        ${multiInputs("item", "location", item.location, "Место")}
        ${multiInputs("item", "text", item.text, "Описание", true)}
      </div>
    </article>
  `;
}

function partnerCard(item, index) {
  return `
    <article class="admin-card" data-row="partnersList" data-index="${index}">
      <div class="admin-card-title"><strong>${item.name}</strong><button class="danger-button" type="button" data-remove="partnersList" data-index="${index}">Удалить</button></div>
      ${imagePreview(item.logo)}
      <label class="wide">Логотип партнера<input type="file" accept="image/*" data-image-list="partnersList" data-index="${index}" data-image-key="logo" /></label>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        <label>Название<input data-field="name" value="${item.name}" /></label>
        <label>Сайт<input data-field="site" value="${item.site}" /></label>
        <label>Текст кнопки SITE<input data-field="siteLabel" value="${item.siteLabel || "SITE"}" /></label>
        <label>Промокод<input data-field="promo" value="${item.promo}" /></label>
        ${multiInputs("item", "text", item.text, "Описание", true)}
      </div>
    </article>
  `;
}

function faqCard(item, index) {
  return `
    <article class="admin-card" data-row="faq" data-index="${index}">
      <div class="admin-card-title"><strong>${ddText(item.question, "ua")}</strong><button class="danger-button" type="button" data-remove="faq" data-index="${index}">Удалить</button></div>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        ${multiInputs("item", "question", item.question, "Вопрос")}
        ${multiInputs("item", "answer", item.answer, "Ответ", true)}
      </div>
    </article>
  `;
}

function paymentCard(item, index) {
  return `
    <article class="admin-card" data-row="paymentStrip" data-index="${index}">
      <div class="admin-card-title"><strong>${ddText(item.title, "ua") || "Оплата"}</strong><button class="danger-button" type="button" data-remove="paymentStrip" data-index="${index}">Удалить</button></div>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        <label>Иконка<input data-field="icon" maxlength="4" value="${item.icon || ""}" /></label>
        ${multiInputs("item", "title", item.title, "Название")}
        ${multiInputs("item", "text", item.text, "Описание", true)}
      </div>
    </article>
  `;
}

function couponCard(item, index) {
  return `
    <article class="admin-card" data-row="coupons" data-index="${index}">
      <div class="admin-card-title"><strong>${item.code || "Промокод"}</strong><button class="danger-button" type="button" data-remove="coupons" data-index="${index}">Удалить</button></div>
      <div class="admin-card-grid">
        <label>Показывать<input data-field="active" type="checkbox" ${item.active !== false ? "checked" : ""} /></label>
        <label>Промокод<input data-field="code" value="${item.code || ""}" /></label>
        <label>Скидка %<input data-field="discount" type="number" min="0" max="100" value="${item.discount ?? 10}" /></label>
      </div>
    </article>
  `;
}

function statCard(item, index) {
  return `
    <article class="admin-card" data-row="stats" data-index="${index}">
      <div class="admin-card-title"><strong>${item.value || "Цифра"}</strong><button class="danger-button" type="button" data-remove="stats" data-index="${index}">Удалить</button></div>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        <label>Значение<input data-field="value" value="${item.value || ""}" /></label>
        ${multiInputs("item", "label", item.label, "Подпись")}
      </div>
    </article>
  `;
}

function advantageCard(item, index) {
  return `
    <article class="admin-card" data-row="advantages" data-index="${index}">
      <div class="admin-card-title"><strong>${ddText(item.text, "ua") || "Преимущество"}</strong><button class="danger-button" type="button" data-remove="advantages" data-index="${index}">Удалить</button></div>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        <label>Иконка<input data-field="icon" maxlength="4" value="${item.icon || ""}" /></label>
        ${multiInputs("item", "text", item.text, "Текст", true)}
      </div>
    </article>
  `;
}

function workStepCard(item, index) {
  return `
    <article class="admin-card" data-row="workSteps" data-index="${index}">
      <div class="admin-card-title"><strong>${ddText(item.title, "ua") || "Шаг"}</strong><button class="danger-button" type="button" data-remove="workSteps" data-index="${index}">Удалить</button></div>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        ${multiInputs("item", "title", item.title, "Заголовок")}
        ${multiInputs("item", "text", item.text, "Текст", true)}
      </div>
    </article>
  `;
}

function reviewCard(item, index) {
  return `
    <article class="admin-card" data-row="reviews" data-index="${index}">
      <div class="admin-card-title"><strong>${item.name || "Отзыв"}</strong><button class="danger-button" type="button" data-remove="reviews" data-index="${index}">Удалить</button></div>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        <label>Имя<input data-field="name" value="${item.name || ""}" /></label>
        ${multiInputs("item", "text", item.text, "Текст", true)}
      </div>
    </article>
  `;
}

function renderAdmin() {
  normalizeAdminData();
  fillContent();
  renderVisibilityEditor();
  if (editors.paymentStrip) editors.paymentStrip.innerHTML = (adminData.paymentStrip || []).map(paymentCard).join("");
  if (editors.coupons) editors.coupons.innerHTML = (adminData.coupons || []).map(couponCard).join("");
  if (editors.stats) editors.stats.innerHTML = (adminData.stats || []).map(statCard).join("");
  if (editors.advantages) editors.advantages.innerHTML = (adminData.advantages || []).map(advantageCard).join("");
  if (editors.workSteps) editors.workSteps.innerHTML = (adminData.workSteps || []).map(workStepCard).join("");
  if (editors.reviews) editors.reviews.innerHTML = (adminData.reviews || []).map(reviewCard).join("");
  editors.categories.innerHTML = (adminData.categories || []).map(categoryCard).join("");
  editors.products.innerHTML = (adminData.products || []).map(productCard).join("");
  editors.guides.innerHTML = (adminData.guides || []).map(guideCard).join("");
  editors.events.innerHTML = (adminData.events || []).map(eventCard).join("");
  editors.partnersList.innerHTML = (adminData.partnersList || []).map(partnerCard).join("");
  editors.faq.innerHTML = (adminData.faq || []).map(faqCard).join("");
  normalizeAdminLabels();
  fixAdminText();
}

function setControlLabel(control, text) {
  const label = control?.closest("label");
  if (!label) return;
  Array.from(label.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) node.remove();
  });
  const textNode = document.createTextNode(text);
  if (control.type === "checkbox") label.append(textNode);
  else label.insertBefore(textNode, label.firstChild);
}

function normalizeAdminLabels() {
  const fieldLabels = ADMIN_LABELS_RU.fields;
  const i18nLabels = ADMIN_LABELS_RU.i18n;
  const imageLabels = ADMIN_LABELS_RU.images;

  document.querySelectorAll("[data-field]").forEach((control) => {
    setControlLabel(control, fieldLabels[control.dataset.field] || control.dataset.field);
  });
  document.querySelectorAll("[data-item-i18n]").forEach((control) => {
    const base = i18nLabels[control.dataset.itemI18n] || control.dataset.itemI18n;
    const lang = (control.dataset.langField || "").toUpperCase();
    setControlLabel(control, `${base} ${lang}`.trim());
  });
  document.querySelectorAll("[data-image-list]").forEach((control) => {
    setControlLabel(control, imageLabels[control.dataset.imageList] || "Image");
  });
  document.querySelectorAll(".image-preview:not(.filled)").forEach((node) => {
    if (node.textContent.trim()) node.textContent = "Нет картинки";
  });
  document.querySelectorAll("[data-remove]").forEach((button) => {
    button.textContent = "Удалить";
  });
  document.querySelectorAll("[data-auto-product]").forEach((button) => {
    button.textContent = "Автоперевод";
  });
}

function collectContent() {
  Object.keys(adminData.content).forEach((key) => {
    if (!field(key)) return;
    if (typeof adminData.content[key] === "object") {
      adminData.content[key] = { ...rawMulti(adminData.content[key]), ua: field(key).value };
    } else {
      adminData.content[key] = field(key).value;
    }
  });
}

function updateItemInput(input) {
  const card = input.closest("[data-row]");
  if (!card) return;
  const list = card.dataset.row;
  const index = Number(card.dataset.index);
  const item = adminData[list][index];
  const key = input.dataset.field;
  const i18nKey = input.dataset.itemI18n;

  if (key) item[key] = input.type === "checkbox" ? input.checked : input.type === "number" ? Number(input.value) : input.value;
  if (i18nKey) {
    item[i18nKey] = rawMulti(item[i18nKey]);
    item[i18nKey][input.dataset.langField] = input.value;
  }
}

function readImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSide = 1100;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const keepsAlpha = /image\/(png|webp|gif|avif)/i.test(file.type || "");
        resolve(keepsAlpha ? canvas.toDataURL("image/png") : canvas.toDataURL("image/jpeg", 0.86));
      };
      image.onerror = () => resolve(reader.result);
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function autoProduct(index) {
  const product = adminData.products[index];
  ["name", "description", "details", "categoryLabel", "status"].forEach((key) => {
    product[key] = rawMulti(product[key]);
    product[key].en ||= product[key].ua;
    product[key].ru ||= product[key].ua;
  });
  renderAdmin();
}

async function saveAll() {
  collectContent();
  setStatus("Сохраняю на сервер...");
  try {
    let savedData = null;
    for (const endpoint of DD_API_ENDPOINTS) {
      try {
        const separator = endpoint.includes("?") ? "&" : "?";
        const response = await fetch(`${endpoint}${separator}ts=${Date.now()}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
          body: JSON.stringify(adminData),
        });
        if (!response.ok) continue;
        savedData = await response.json();
        break;
      } catch (error) {}
    }
    if (!savedData) throw new Error("Save failed");
    adminData = ddMergeStoreData(savedData);
    setStatus("Сохранено в базу. Изменения сразу доступны всем посетителям.");
  } catch (error) {
    setStatus("Не удалось сохранить на сервер. Проверь backend/права на data/db.json.");
  }
}

form?.addEventListener("input", (event) => {
  const visibilityToggle = event.target.closest("[data-visibility-key]");
  if (visibilityToggle) {
    adminData.visibility = ddNormalizeVisibility(adminData.visibility);
    adminData.visibility[visibilityToggle.dataset.visibilityKey] = visibilityToggle.checked;
    setStatus("Есть несохраненные изменения");
    return;
  }
  collectContent();
  updateItemInput(event.target);
  setStatus("Есть несохраненные изменения");
});

form?.addEventListener("change", async (event) => {
  const contentImage = event.target.closest("[data-content-image]");
  const listImage = event.target.closest("[data-image-list]");
  const file = event.target.files?.[0];
  if (!file) return;
  const src = await readImage(file);

  if (contentImage) adminData.content[contentImage.dataset.contentImage] = src;
  if (listImage) adminData[listImage.dataset.imageList][Number(listImage.dataset.index)][listImage.dataset.imageKey] = src;
  renderAdmin();
  setStatus("Картинка загружена. Не забудьте сохранить.");
});

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const login = loginForm.elements.login.value.trim();
  const password = loginForm.elements.password.value;
  if (login === DD_ADMIN_LOGIN && password === DD_ADMIN_PASSWORD) {
    localStorage.setItem(DD_ADMIN_AUTH_KEY, "1");
    if (loginError) loginError.textContent = "";
    updateAuthView();
    return;
  }
  if (loginError) loginError.textContent = "Неверный логин или пароль";
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-admin-logout]")) {
    localStorage.removeItem(DD_ADMIN_AUTH_KEY);
    updateAuthView();
  }

  const tab = event.target.closest("[data-admin-tab]");
  if (tab) {
    document.querySelectorAll("[data-admin-tab]").forEach((button) => button.classList.remove("active"));
    document.querySelectorAll("[data-admin-section]").forEach((section) => section.classList.add("is-hidden"));
    tab.classList.add("active");
    document.querySelector(`[data-admin-section="${tab.dataset.adminTab}"]`)?.classList.remove("is-hidden");
  }

  if (event.target.closest("[data-save]")) saveAll();
  if (event.target.closest("[data-reset]")) {
    adminData = ddClone(DD_DEFAULT_DATA);
    renderAdmin();
    setStatus("Данные сброшены в форме. Нажмите сохранить, чтобы обновить базу.");
  }

  const remove = event.target.closest("[data-remove]");
  if (remove) {
    adminData[remove.dataset.remove].splice(Number(remove.dataset.index), 1);
    renderAdmin();
    setStatus("Удалено. Не забудьте сохранить.");
  }

  const auto = event.target.closest("[data-auto-product]");
  if (auto) autoProduct(Number(auto.dataset.autoProduct));

  if (event.target.closest("[data-add-category]")) {
    adminData.categories.unshift({
      id: uid("category"),
      icon: "#",
      image: "",
      title: { ua: "Нова категорія", en: "New category", ru: "Новая категория" },
      text: { ua: "Опис категорії", en: "Category description", ru: "Описание категории" },
    });
    renderAdmin();
    setStatus("Категория добавлена.");
  }

  if (event.target.closest("[data-add-payment]")) {
    adminData.paymentStrip = adminData.paymentStrip || [];
    adminData.paymentStrip.push({
      icon: "$",
      title: { ua: "Новий спосіб", en: "New method", ru: "Новый способ" },
      text: { ua: "Опис оплати", en: "Payment note", ru: "Описание оплаты" },
    });
    renderAdmin();
    setStatus("Платежный пункт добавлен.");
  }

  if (event.target.closest("[data-add-coupon]")) {
    adminData.coupons = adminData.coupons || [];
    adminData.coupons.push({ code: "DD2026", discount: 10, active: true });
    renderAdmin();
    setStatus("Промокод добавлен.");
  }

  if (event.target.closest("[data-add-stat]")) {
    adminData.stats = adminData.stats || [];
    adminData.stats.push({ value: "100+", label: { ua: "новий показник", en: "new stat", ru: "новый показатель" } });
    renderAdmin();
    setStatus("Показатель добавлен.");
  }

  if (event.target.closest("[data-add-advantage]")) {
    adminData.advantages = adminData.advantages || [];
    adminData.advantages.push({ icon: "✓", text: { ua: "Нова перевага", en: "New advantage", ru: "Новое преимущество" } });
    renderAdmin();
    setStatus("Преимущество добавлено.");
  }

  if (event.target.closest("[data-add-work-step]")) {
    adminData.workSteps = adminData.workSteps || [];
    adminData.workSteps.push({
      title: { ua: "Новий крок", en: "New step", ru: "Новый шаг" },
      text: { ua: "Опис кроку", en: "Step description", ru: "Описание шага" },
    });
    renderAdmin();
    setStatus("Шаг добавлен.");
  }

  if (event.target.closest("[data-add-review]")) {
    adminData.reviews = adminData.reviews || [];
    adminData.reviews.push({ name: "Client", text: { ua: "Новий відгук", en: "New review", ru: "Новый отзыв" } });
    renderAdmin();
    setStatus("Отзыв добавлен.");
  }

  if (event.target.closest("[data-add-product]")) {
    adminData.products.unshift({
      id: uid("product"),
      name: { ua: "Новий товар", en: "", ru: "" },
      description: { ua: "Опис товару", en: "", ru: "" },
      details: { ua: "Детальное описание товара", en: "", ru: "" },
      category: "social",
      subcategory: "",
      categoryLabel: { ua: "Соцмережі", en: "", ru: "" },
      badge: "NN",
      status: { ua: "В наявності", en: "", ru: "" },
      price: 25,
      stockQty: 10,
      countryFlag: "",
      featured: false,
      drop: false,
      inStock: true,
      image: "",
    });
    autoProduct(0);
    setStatus("Товар добавлен.");
  }

  if (event.target.closest("[data-add-guide]")) {
    adminData.guides.unshift({ id: uid("news"), title: { ua: "Нова новина", en: "New post", ru: "Новая новость" }, excerpt: { ua: "Короткий опис", en: "Short excerpt", ru: "Короткое описание" }, body: { ua: "Текст новини", en: "Article text", ru: "Текст новости" }, category: "arbitraj", size: "medium", image: "" });
    renderAdmin();
  }

  if (event.target.closest("[data-add-event]")) {
    adminData.events.unshift({ id: uid("event"), title: { ua: "Нова подія", en: "New event", ru: "Новое событие" }, date: "", location: { ua: "Online", en: "Online", ru: "Online" }, text: { ua: "Опис події", en: "Event description", ru: "Описание события" }, image: "" });
    renderAdmin();
  }

  if (event.target.closest("[data-add-partner]")) {
    adminData.partnersList.unshift({ id: uid("partner"), name: "New partner", site: "https://example.com", siteLabel: "SITE", promo: "DAMAGE", text: { ua: "Опис партнера", en: "Partner description", ru: "Описание партнера" }, logo: "" });
    renderAdmin();
  }

  if (event.target.closest("[data-add-faq]")) {
    adminData.faq.push({ question: { ua: "Нове питання", en: "New question", ru: "Новый вопрос" }, answer: { ua: "Відповідь.", en: "Answer.", ru: "Ответ." } });
    renderAdmin();
  }
});

async function initAdmin() {
  adminData = await ddLoadServerStore();
  updateAuthView();
  renderAdmin();
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch (error) {}
  }
  document.documentElement.classList.add("dd-ready");
}

initAdmin();


