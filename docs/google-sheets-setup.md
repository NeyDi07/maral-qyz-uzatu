# Google Sheets RSVP Setup (Марал Қыз Ұзату)

## Ссылки на проект и таблицу

- **Google Таблица (старая рабочая база с 34 ответами гостей):**  
  [https://docs.google.com/spreadsheets/d/1Ov8m0pOH4dKEoyiDWIFa6Q2mvoSNrKYkswDREzil9Oo/edit](https://docs.google.com/spreadsheets/d/1Ov8m0pOH4dKEoyiDWIFa6Q2mvoSNrKYkswDREzil9Oo/edit)
- **Google Apps Script проекта:**  
  [https://script.google.com/u/0/home/projects/1s1vFLMU-e_K_ECwSuDv6yzMgEuHouI7LgEUUUYy5nTe-6fGTT4KM0Url/edit](https://script.google.com/u/0/home/projects/1s1vFLMU-e_K_ECwSuDv6yzMgEuHouI7LgEUUUYy5nTe-6fGTT4KM0Url/edit)

---

## Почему данные перестали приходить (Причина сбоя)

1. **Ошибка 403 Forbidden ("Нет доступа / Доступ закрыт"):**  
   Google Apps Script при обращении к URL веб-приложения возвращает статус **403 Forbidden**. Это происходит, когда в настройках развертывания параметр **«Кто имеет доступ» (Who has access)** установлен в *«Только я»* вместо *«Все» (Anyone)*, либо когда было создано новое развертывание, а старое отключено.
2. **Скрытая ошибка в браузере (`mode: 'no-cors'`):**  
   Из-за режима `no-cors` браузер не показывал ошибку 403, создавая иллюзию успешной отправки, хотя данные отбрасывались сервером Google.
3. **Отсутствие имени при отказе:**  
   Если гость выбирал «Өкінішке орай, келе алмаймын», в форме не было поля для ввода имени, и в таблицу уходило пустое имя или заглушка «Қонақ».

---

## Что исправлено в коде

1. В форму RSVP добавлено обязательное поле ввода имени гостя при отказе, теперь организаторы всегда видят, кто именно ответил.
2. Создан серверный Route Handler `/api/rsvp` в Next.js, который проверяет ответ Google Apps Script и предотвращает тихие сбои.
3. В `google-apps-script.js` добавлен метод `doGet` для быстрой проверки доступности URL через браузер, улучшена обработка имен при отказе и сделана безопасная инициализация дашборда без риска очистки существующих строк с гостями.

---

## Инструкция по включению доступа (1 минута)

### Шаг 1. Открой Apps Script
Перейди по ссылке:  
[https://script.google.com/u/0/home/projects/1s1vFLMU-e_K_ECwSuDv6yzMgEuHouI7LgEUUUYy5nTe-6fGTT4KM0Url/edit](https://script.google.com/u/0/home/projects/1s1vFLMU-e_K_ECwSuDv6yzMgEuHouI7LgEUUUYy5nTe-6fGTT4KM0Url/edit)  
*(убедись, что вошел под тем же Google-аккаунтом, например `neydi.kz@gmail.com`)*

### Шаг 2. Обнови код
1. Скопируй весь код из файла `google-apps-script.js` (в корне проекта).
2. Вставь в редактор Apps Script и нажми **Ctrl+S** (Сохранить).

### Шаг 3. Включи доступ "Все" (Anyone) в развертывании
1. В правом верхнем углу нажми кнопку **Развернуть (Deploy)**.
2. Выбери **Управление развертываниями (Manage deployments)**.
3. Нажми на иконку ✎ (**Редактировать / Edit**) у веб-приложения.
4. В поле **Версия (Version)** выбери: **Новая версия (New version)**.
5. **ГЛАВНОЕ:** В поле **Кто имеет доступ (Who has access)** выбери: **Все (Anyone)**!
6. Нажми **Развернуть (Deploy)**.
7. Скопируй полученный URL веб-приложения (заканчивается на `/exec`).

> **Проверка работоспособности:**  
> Просто открой этот URL в новой вкладке браузера. Он должен вернуть:  
> `{"status":"ok","message":"Марал Қыз Ұзату — RSVP API жұмыс істеп тұр", ...}`.  
> Если открывается — доступ открыт на 100%!

### Шаг 4. Укажи URL
1. Вставь этот URL в `.env.local`:
```env
NEXT_PUBLIC_RSVP_ENDPOINT=ТВОЙ_НОВЫЙ_URL_ИЗ_ШАГА_3
```
2. Обнови переменную `NEXT_PUBLIC_RSVP_ENDPOINT` на Vercel (Settings -> Environment Variables) и выполни Redeploy.
