[search-mode]
MAXIMIZE SEARCH EFFORT. Launch multiple background agents IN PARALLEL:
- explore agents (codebase patterns, file structures, ast-grep)
- librarian agents (remote repos, official docs, GitHub examples)
Plus direct tools: Grep, ripgrep (rg), ast-grep (sg)
NEVER stop at first result - be exhaustive.

---

Начал делать план

---


## Сегодня — техническая подготовка


### Шаг 1. Задеплой сайт


Все изменения (блог, comparison pages, pricing, footer) готовы. Пушни и деплой.


```
git add -A && git commit -m "..." && git push
```


После деплоя проверь что работают:
- plexui.com/blog
- plexui.com/blog/why-9-sizes (демо крутится?)
- plexui.com/compare/shadcn-ui
- plexui.com/compare/untitled-ui
- plexui.com/#pricing (зачёркнутые цены видны?)


### Шаг 2. Протестируй покупку


Зайди в Lemon Squeezy → включи **Test Mode** → пройди весь путь:
1. Нажми "Get Team" на plexui.com
2. Оплати тестовой картой
3. Убедись что приходит email с файлом/ссылкой на Figma
4. Проверь что файл открывается и "Duplicate to drafts" работает


Если файл не прикреплён к продукту — прикрепи в Lemon Squeezy dashboard.


### Шаг 3. Настрой аналитику


У тебя уже стоит `@vercel/analytics`. Дополнительно:
- Зайди в [Lemon Squeezy → Settings → Webhooks](https://app.lemonsqueezy.com/settings/webhooks) — включи уведомления о покупках на свой email
- Зайди в [Google Search Console](https://search.google.com/search-console) → добавь plexui.com → подтверди через DNS → отправь sitemap (`plexui.com/sitemap.xml`)


---


## Завтра — визуальные ассеты


### Шаг 4. Запиши 3 GIF/видео


Тебе нужны короткие демо для постов. Используй [CleanShot X](https://cleanshot.com/) или Screen Studio:


**GIF 1: Size scale (15 сек)**
Открой plexui.com/docs/overview/sizing → переключай размеры с 3xs до 3xl → запиши


**GIF 2: Dark mode (5 сек)**
Переключи тему на сайте light→dark → запиши


**GIF 3: Figma-to-code (20 сек)**
Открой Figma файл с компонентом → рядом открой ту же страницу на plexui.com → покажи что идентичны


Сохрани в `marketing/assets/`.


### Шаг 5. Сделай free Figma community file


Это критично для трафика. Figma Community — бесплатный канал привлечения.


1. Открой полный Figma kit
2. Скопируй 4-5 компонентов: **Button, Input, Select, SegmentedControl, Badge**
3. Добавь страницу "Get the full kit → plexui.com/pricing"
4. Опубликуй в [Figma Community](https://www.figma.com/community) как бесплатный файл
5. В описании: ссылка на plexui.com + "35 components, 9-size scale, 22,000+ variants in the full kit"


---


## Через 2-3 дня — запуск (Wave 1: Dev community)


### Шаг 6. Запости на Reddit


Файл с готовым постом: `marketing/reddit-r-reactjs.md`


1. Иди в [r/reactjs](https://reddit.com/r/reactjs)
2. Создай текстовый пост (не ссылку!)
3. Скопируй **Option A** (technical) из файла
4. Прикрепи GIF с size scale если можно
5. **Первые 2 часа отвечай на КАЖДЫЙ комментарий**


Через 2-3 дня — тот же пост в r/webdev (адаптация есть в файле).


### Шаг 7. Запости Show HN


Файл: `marketing/hackernews-show-hn.md`


1. Иди на [news.ycombinator.com/submit](https://news.ycombinator.com/submit)
2. Title: `Show HN: Plex UI – Open-source React design system with 9-size scale and Figma parity`
3. URL: `https://plexui.com`
4. Сразу после публикации — добавь первый комментарий из файла
5. Лучшее время: вторник-четверг, 15:00-17:00 по Мадриду (8-10 AM ET)


### Шаг 8. Запусти Twitter тред


Файл: `marketing/twitter-launch-thread.md`


1. Запости тред из 8 твитов (каждый раздел = один твит)
2. К твитам 3, 5, 7 прикрепи GIF/скриншоты
3. Закрепи тред в профиле
4. В течение дня добавляй reply-твиты из секции "Follow-up Tweets"


---


## Через неделю — Wave 2: Product Hunt


### Шаг 9. Подготовь PH листинг


Файл: `marketing/producthunt.md`


1. Зайди на [producthunt.com/posts/new](https://www.producthunt.com/posts/new)
2. Заполни по файлу: tagline, description, topics
3. Загрузи 5 скриншотов (1270x760px) — что снять описано в файле
4. **НЕ публикуй сразу** — сохрани как draft


### Шаг 10. Собери поддержку


За 2-3 дня до PH launch:
- Напиши 10-20 людям (друзья, коллеги, знакомые разработчики)
- Попроси: "Я запускаю проект на Product Hunt в [день]. Буду рад если зайдёшь и оставишь честный отзыв"
- **НЕ проси "upvote"** — PH банит за это. Проси "check it out and leave feedback"


### Шаг 11. Запусти PH


- Лучший день: **вторник или среда**
- Время: 00:01 AM PT (9:01 утра по Мадриду)
- Сразу добавь Maker comment из файла
- Шарь в Twitter: "We just launched on Product Hunt! [ссылка]"
- Отвечай на каждый комментарий в течение 12 часов


---


## Дальше — контент-машина (месяц 2+)


### Шаг 12. Публикуй статью в неделю


Блог уже работает. Следующие статьи по приоритету:


1. "Plex UI vs shadcn/ui — honest comparison" (уже есть как /compare страница, переработай в blog post)
2. "Three-layer design tokens explained"
3. "From Figma Variables to CSS custom properties"


Формат: пиши в `content/blog/[slug].mdx`, деплой, шарь в Twitter.


### Шаг 13. Twitter cadence


- **Понедельник**: Component spotlight (GIF + код)
- **Среда**: Design token tip или Figma trick
- **Пятница**: Community feature или user showcase


---


Нужна помощь