// ============================================================
//  Марал Қыз Ұзату — Google Apps Script (RSVP + Дашборд)
// ============================================================
//  1. Открой Таблицу → Расширения → Apps Script
//  2. Удали весь код, который там есть, и вставь ЭТОТ код
//  3. Нажми "Сохранить" (Ctrl+S)
//  4. Нажми "Развернуть" → "Новое развертывание" → "Веб-приложение"
//     - Выполнять от: Я
//     - У кого есть доступ: Все
//  5. Скопируй URL (заканчивается на /exec)
//  6. Обнови переменную NEXT_PUBLIC_RSVP_ENDPOINT в .env.local и на Vercel
//  7. После первого ответа от гостя — запусти setupDashboard() вручную
//     (выбери функцию setupDashboard в выпадающем списке и нажми ▶ Выполнить)
// ============================================================

// ---------- ОБРАБОТКА POST-ЗАПРОСА ОТ САЙТА ----------
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Ответы") || ss.getActiveSheet();

    // Форматируем дату по-человечески (часовой пояс Алматы)
    var submittedDate = new Date(data.submittedAt || new Date().toISOString());
    var timeZone = "Asia/Almaty";
    var formattedDate = Utilities.formatDate(submittedDate, timeZone, "dd.MM.yyyy");
    var formattedTime = Utilities.formatDate(submittedDate, timeZone, "HH:mm:ss");

    // Получаем все имена гостей одной строкой
    var guestNames = data.guestNames || [];
    var allNames = guestNames.join(", ");

    // Определяем статус на русском
    var statusText = "";
    if (data.attendance === "coming") {
      statusText = "Келеді";
    } else if (data.attendance === "not_coming") {
      statusText = "Келмейді";
    } else if (data.attendance === "with_partner") {
      statusText = "Жұбайымен келеді";
    } else {
      statusText = data.attendance || "";
    }

    // Определяем количество гостей
    var totalGuests = 0;
    if (data.attendance === "coming") {
      totalGuests = data.guestCount || guestNames.length || 1;
    } else if (data.attendance === "with_partner") {
      totalGuests = 2;
    }

    sheet.appendRow([
      formattedDate + " " + formattedTime,  // A: Дата и время
      data.name || "",                       // B: Основное имя
      statusText,                            // C: Статус (Келеді / Келмейді / Жұбайымен келеді)
      totalGuests,                           // D: Количество гостей
      allNames,                              // E: Все имена гостей
    ]);

    // Автообновление дашборда
    updateDashboard();

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ---------- СОЗДАНИЕ / ОБНОВЛЕНИЕ ДАШБОРДА ----------
function updateDashboard() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("Ответы");
  if (!dataSheet) return;

  var dashboard = ss.getSheetByName("Дашборд");
  if (!dashboard) {
    dashboard = ss.insertSheet("Дашборд");
  }

  dashboard.clear();

  // --- Заголовок ---
  dashboard.getRange("A1:F1").merge();
  var titleCell = dashboard.getRange("A1");
  titleCell.setValue("МАРАЛ ҚЫЗ ҰЗАТУ — СТАТИСТИКА ҚОНАҚТАР");
  titleCell.setFontSize(18).setFontWeight("bold").setHorizontalAlignment("center");
  titleCell.setBackground("#4A154B").setFontColor("#FFFFFF");

  // --- Карточки статистики ---
  var data = dataSheet.getDataRange().getValues();
  var headerRow = data[0];
  var statusCol = headerRow.indexOf("Статус");
  var guestCountCol = headerRow.indexOf("Количество гостей");
  if (statusCol === -1) statusCol = 2;
  if (guestCountCol === -1) guestCountCol = 3;

  var totalComing = 0;
  var totalNotComing = 0;
  var totalPartner = 0;
  var totalGuestCount = 0;
  var comingNames = [];
  var notComingNames = [];
  var partnerNames = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var status = row[statusCol] ? row[statusCol].toString() : "";
    var name_1 = row[1] ? row[1].toString() : "";
    var guests = row[guestCountCol] ? Number(row[guestCountCol]) : 0;

    if (status === "Келеді") {
      totalComing++;
      totalGuestCount += guests;
      comingNames.push(name_1);
    } else if (status === "Келмейді") {
      totalNotComing++;
      notComingNames.push(name_1);
    } else if (status === "Жұбайымен келеді") {
      totalPartner++;
      totalGuestCount += guests;
      partnerNames.push(name_1);
    }
  }

  var totalResponses = totalComing + totalNotComing + totalPartner;

  // Ряд 3: карточки
  dashboard.getRange("A3:C3").merge();
  dashboard.getRange("A3").setValue("БАРЛЫҒЫ").setFontSize(14).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#E8E0EC").setFontColor("#4A154B");

  dashboard.getRange("D3:F3").merge();
  dashboard.getRange("D3").setValue("ЖАЛПЫ ҚОНАҚ САНЫ").setFontSize(14).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#E8E0EC").setFontColor("#4A154B");

  dashboard.getRange("A4:C4").merge();
  dashboard.getRange("A4").setValue(totalResponses).setFontSize(42).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#F5F0F7").setFontColor("#4A154B");

  dashboard.getRange("D4:F4").merge();
  dashboard.getRange("D4").setValue(totalGuestCount).setFontSize(42).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#F5F0F7").setFontColor("#4A154B");

  // Ряд 5: подписи под карточками
  dashboard.getRange("A5:C5").merge();
  dashboard.getRange("A5").setValue("адам жауап берді").setFontSize(10)
    .setHorizontalAlignment("center").setBackground("#F5F0F7").setFontColor("#888888");

  dashboard.getRange("D5:F5").merge();
  dashboard.getRange("D5").setValue("адам келеді").setFontSize(10)
    .setHorizontalAlignment("center").setBackground("#F5F0F7").setFontColor("#888888");

  // Ряд 7-9: карточки Келеді
  dashboard.getRange("A7:B7").merge();
  dashboard.getRange("A7").setValue("КЕЛЕДІ").setFontSize(12).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#D4EDDA").setFontColor("#155724");

  dashboard.getRange("C7:D7").merge();
  dashboard.getRange("C7").setValue("ЖҰБАЙЫМЕН").setFontSize(12).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#D1ECF1").setFontColor("#0C5460");

  dashboard.getRange("E7:F7").merge();
  dashboard.getRange("E7").setValue("КЕЛМЕЙДІ").setFontSize(12).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#F8D7DA").setFontColor("#721C24");

  dashboard.getRange("A8:B8").merge();
  dashboard.getRange("A8").setValue(totalComing).setFontSize(36).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#D4EDDA").setFontColor("#155724");

  dashboard.getRange("C8:D8").merge();
  dashboard.getRange("C8").setValue(totalPartner).setFontSize(36).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#D1ECF1").setFontColor("#0C5460");

  dashboard.getRange("E8:F8").merge();
  dashboard.getRange("E8").setValue(totalNotComing).setFontSize(36).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#F8D7DA").setFontColor("#721C24");

  dashboard.getRange("A9:B9").merge();
  dashboard.getRange("A9").setValue("адам").setFontSize(10).setHorizontalAlignment("center")
    .setBackground("#D4EDDA").setFontColor("#155724");

  dashboard.getRange("C9:D9").merge();
  dashboard.getRange("C9").setValue("жұп").setFontSize(10).setHorizontalAlignment("center")
    .setBackground("#D1ECF1").setFontColor("#0C5460");

  dashboard.getRange("E9:F9").merge();
  dashboard.getRange("E9").setValue("адам").setFontSize(10).setHorizontalAlignment("center")
    .setBackground("#F8D7DA").setFontColor("#721C24");

  // --- Списки гостей ---
  var rowNum = 11;
  dashboard.getRange("A" + rowNum).setValue("КЕЛЕТІНДЕР ТІЗІМІ").setFontWeight("bold").setFontSize(13)
    .setBackground("#D4EDDA").setFontColor("#155724");
  dashboard.getRange("A" + rowNum + ":F" + rowNum).merge();
  rowNum++;

  if (comingNames.length > 0) {
    for (var ci = 0; ci < comingNames.length; ci++) {
      dashboard.getRange("A" + rowNum).setValue((ci + 1) + ".");
      dashboard.getRange("B" + rowNum + ":F" + rowNum).merge();
      dashboard.getRange("B" + rowNum).setValue(comingNames[ci]);
      rowNum++;
    }
  } else {
    dashboard.getRange("A" + rowNum + ":F" + rowNum).merge();
    dashboard.getRange("A" + rowNum).setValue("Әзірге ешкім жоқ").setFontColor("#888888");
    rowNum++;
  }

  rowNum++;
  dashboard.getRange("A" + rowNum).setValue("ЖҰБАЙЫМЕН КЕЛЕТІНДЕР").setFontWeight("bold").setFontSize(13)
    .setBackground("#D1ECF1").setFontColor("#0C5460");
  dashboard.getRange("A" + rowNum + ":F" + rowNum).merge();
  rowNum++;

  if (partnerNames.length > 0) {
    for (var pi = 0; pi < partnerNames.length; pi++) {
      dashboard.getRange("A" + rowNum).setValue((pi + 1) + ".");
      dashboard.getRange("B" + rowNum + ":F" + rowNum).merge();
      dashboard.getRange("B" + rowNum).setValue(partnerNames[pi]);
      rowNum++;
    }
  } else {
    dashboard.getRange("A" + rowNum + ":F" + rowNum).merge();
    dashboard.getRange("A" + rowNum).setValue("Әзірге ешкім жоқ").setFontColor("#888888");
    rowNum++;
  }

  rowNum++;
  dashboard.getRange("A" + rowNum).setValue("КЕЛМЕЙТІНДЕР ТІЗІМІ").setFontWeight("bold").setFontSize(13)
    .setBackground("#F8D7DA").setFontColor("#721C24");
  dashboard.getRange("A" + rowNum + ":F" + rowNum).merge();
  rowNum++;

  if (notComingNames.length > 0) {
    for (var ni = 0; ni < notComingNames.length; ni++) {
      dashboard.getRange("A" + rowNum).setValue((ni + 1) + ".");
      dashboard.getRange("B" + rowNum + ":F" + rowNum).merge();
      dashboard.getRange("B" + rowNum).setValue(notComingNames[ni]);
      rowNum++;
    }
  } else {
    dashboard.getRange("A" + rowNum + ":F" + rowNum).merge();
    dashboard.getRange("A" + rowNum).setValue("Әзірге ешкім жоқ").setFontColor("#888888");
    rowNum++;
  }

  rowNum += 2;
  dashboard.getRange("A" + rowNum + ":F" + rowNum).merge();
  dashboard.getRange("A" + rowNum).setValue("Соңғы жаңарту: " + Utilities.formatDate(new Date(), "Asia/Almaty", "dd.MM.yyyy HH:mm"))
    .setFontSize(9).setFontColor("#AAAAAA").setHorizontalAlignment("right");

  // Ширина колонок
  dashboard.setColumnWidth(1, 30);
  dashboard.setColumnWidth(2, 140);
  dashboard.setColumnWidth(3, 140);
  dashboard.setColumnWidth(4, 140);
  dashboard.setColumnWidth(5, 140);
  dashboard.setColumnWidth(6, 140);

  // Высота строк
  dashboard.setRowHeight(1, 45);
  dashboard.setRowHeight(3, 30);
  dashboard.setRowHeight(4, 70);
  dashboard.setRowHeight(5, 20);
  dashboard.setRowHeight(7, 30);
  dashboard.setRowHeight(8, 60);
  dashboard.setRowHeight(9, 20);
}

// ---------- ПЕРВОНАЧАЛЬНАЯ НАСТРОЙКА ----------
function setupDashboard() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Основной лист "Ответы"
  var sheet = ss.getSheetByName("Ответы");
  if (!sheet) {
    sheet = ss.insertSheet("Ответы");
  }
  sheet.clear();

  // Заголовки
  var headers = ["Дата и время", "Есім", "Статус", "Қонақ саны", "Барлық есімдер"];
  sheet.getRange("A1:E1").setValues([headers]);
  sheet.getRange("A1:E1")
    .setFontWeight("bold")
    .setFontSize(11)
    .setBackground("#4A154B")
    .setFontColor("#FFFFFF")
    .setHorizontalAlignment("center");

  sheet.setColumnWidth(1, 170);
  sheet.setColumnWidth(2, 170);
  sheet.setColumnWidth(3, 170);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 300);

  // Условное форматирование для столбца C (Статус)
  var range = sheet.getRange("C2:C");
  var rules = sheet.getConditionalFormatRules();

  // Зелёный для "Келеді"
  var greenRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Келеді")
    .setBackground("#D4EDDA")
    .setFontColor("#155724")
    .setRanges([range])
    .build();

  // Синий для "Жұбайымен келеді"
  var blueRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Жұбайымен келеді")
    .setBackground("#D1ECF1")
    .setFontColor("#0C5460")
    .setRanges([range])
    .build();

  // Красный для "Келмейді"
  var redRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Келмейді")
    .setBackground("#F8D7DA")
    .setFontColor("#721C24")
    .setRanges([range])
    .build();

  sheet.setConditionalFormatRules([greenRule, blueRule, redRule]);

  // Создать Дашборд
  updateDashboard();

  SpreadsheetApp.getUi().alert("Таблица готова! Заголовки созданы, дашборд настроен. Можете тестировать.");
}