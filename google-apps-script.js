// ============================================================
//  Марал Қыз Ұзату — Google Apps Script (RSVP + Дашборд)
//  Версия 2 — под новую форму (1 қонақ / 2 қонақ / 3+ қонақ)
// ============================================================
//  Обновление:
//  1. Скопируй ВЕСЬ этот код в Apps Script (замени старый)
//  2. Ctrl+S сохранить
//  3. Выбери setupDashboard → ▶ Выполнить (один раз)
//  4. Развернуть → Управление развертываниями → ✎ (карандаш) →
//     Версия: Новая → Развернуть
// ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Ответы") || ss.getActiveSheet();

    var submittedDate = new Date(data.submittedAt || new Date().toISOString());
    var timeZone = "Asia/Almaty";
    var formattedDate = Utilities.formatDate(submittedDate, timeZone, "dd.MM.yyyy");
    var formattedTime = Utilities.formatDate(submittedDate, timeZone, "HH:mm:ss");

    // Основные имена гостей (первые 2 поля)
    var guestNames = data.guestNames || [];
    // Дополнительные имена (поле "Қалған қонақтардың есімдері")
    var extra = data.extraGuestNames || "";

    // Склеиваем все имена
    var allNames = guestNames.join(", ");
    if (extra.trim()) {
      allNames += (allNames ? ", " : "") + extra.trim();
    }

    // Статус
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

    // Количество гостей
    var totalGuests = 0;
    if (data.attendance === "coming") {
      if (typeof data.guestCount === "number") {
        totalGuests = data.guestCount;
      } else if (data.guestCount === "3plus") {
        // 3+ гостей: 2 основных + считаем через запятую в extra
        var extraCount = extra.trim() ? extra.trim().split(/,\s*/).length : 0;
        totalGuests = 2 + extraCount;
      } else {
        totalGuests = guestNames.length || 1;
      }
    } else if (data.attendance === "with_partner") {
      totalGuests = 2;
    }

    // Категория: сколько гостей
    var guestLabel = "";
    if (data.attendance === "coming") {
      if (data.guestCount === "3plus") {
        guestLabel = "3+ қонақ (" + totalGuests + ")";
      } else if (typeof data.guestCount === "number") {
        guestLabel = data.guestCount + " қонақ";
      } else {
        guestLabel = (guestNames.length || 1) + " қонақ";
      }
    }

    sheet.appendRow([
      formattedDate + " " + formattedTime,  // A: Дата и время
      data.name || "",                       // B: Основное имя
      statusText,                            // C: Статус
      totalGuests,                           // D: Количество гостей
      guestLabel,                            // E: Категория (1/2/3+)
      allNames,                              // F: Все имена
    ]);

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

// ============================================================
//  ДАШБОРД
// ============================================================
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

  // --- Сбор данных ---
  var data = dataSheet.getDataRange().getValues();
  var headerRow = data[0];
  var statusCol = indexOfHeader(headerRow, "Статус", 2);
  var guestCountCol = indexOfHeader(headerRow, "Количество гостей", 3);
  var allNamesCol = indexOfHeader(headerRow, "Все имена", 5);

  var totalComing = 0;
  var totalNotComing = 0;
  var totalGuestCount = 0;
  var comingEntries = []; // { name, count }
  var notComingNames = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row || !row[statusCol]) continue;
    var status = row[statusCol].toString();
    var name_1 = row[1] ? row[1].toString() : "";
    var guests = row[guestCountCol] ? Number(row[guestCountCol]) : 0;
    var allNamesStr = row[allNamesCol] ? row[allNamesCol].toString() : name_1;

    if (status === "Келеді" || status === "Жұбайымен келеді") {
      totalComing++;
      totalGuestCount += guests;
      comingEntries.push({ name: allNamesStr || name_1, count: guests });
    } else if (status === "Келмейді") {
      totalNotComing++;
      notComingNames.push(name_1);
    }
  }

  var totalResponses = totalComing + totalNotComing;

  // === Ряд 3-5: Главные карточки ===
  // БАРЛЫҒЫ
  dashboard.getRange("A3:C3").merge();
  dashboard.getRange("A3").setValue("БАРЛЫҒЫ").setFontSize(13).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#E8E0EC").setFontColor("#4A154B");
  dashboard.getRange("A4:C4").merge();
  dashboard.getRange("A4").setValue(totalResponses).setFontSize(42).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#F5F0F7").setFontColor("#4A154B");
  dashboard.getRange("A5:C5").merge();
  dashboard.getRange("A5").setValue("адам жауап берді").setFontSize(10)
    .setHorizontalAlignment("center").setBackground("#F5F0F7").setFontColor("#888888");

  // ЖАЛПЫ ҚОНАҚ
  dashboard.getRange("D3:F3").merge();
  dashboard.getRange("D3").setValue("ЖАЛПЫ ҚОНАҚ САНЫ").setFontSize(13).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#E8E0EC").setFontColor("#4A154B");
  dashboard.getRange("D4:F4").merge();
  dashboard.getRange("D4").setValue(totalGuestCount).setFontSize(42).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#F5F0F7").setFontColor("#4A154B");
  dashboard.getRange("D5:F5").merge();
  dashboard.getRange("D5").setValue("адам келеді").setFontSize(10)
    .setHorizontalAlignment("center").setBackground("#F5F0F7").setFontColor("#888888");

  // === Ряд 7-9: Карточки Келеді / Келмейді ===
  dashboard.getRange("A7:C7").merge();
  dashboard.getRange("A7").setValue("КЕЛЕДІ").setFontSize(12).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#D4EDDA").setFontColor("#155724");

  dashboard.getRange("D7:F7").merge();
  dashboard.getRange("D7").setValue("КЕЛМЕЙДІ").setFontSize(12).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#F8D7DA").setFontColor("#721C24");

  dashboard.getRange("A8:C8").merge();
  dashboard.getRange("A8").setValue(totalComing).setFontSize(36).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#D4EDDA").setFontColor("#155724");

  dashboard.getRange("D8:F8").merge();
  dashboard.getRange("D8").setValue(totalNotComing).setFontSize(36).setFontWeight("bold")
    .setHorizontalAlignment("center").setBackground("#F8D7DA").setFontColor("#721C24");

  dashboard.getRange("A9:C9").merge();
  dashboard.getRange("A9").setValue("жауап").setFontSize(10).setHorizontalAlignment("center")
    .setBackground("#D4EDDA").setFontColor("#155724");

  dashboard.getRange("D9:F9").merge();
  dashboard.getRange("D9").setValue("жауап").setFontSize(10).setHorizontalAlignment("center")
    .setBackground("#F8D7DA").setFontColor("#721C24");

  // === Списки гостей ===
  var rowNum = 11;

  // КЕЛЕТІНДЕР
  dashboard.getRange("A" + rowNum + ":F" + rowNum).merge();
  dashboard.getRange("A" + rowNum).setValue("КЕЛЕТІНДЕР ТІЗІМІ  (" + totalGuestCount + " адам)")
    .setFontWeight("bold").setFontSize(13)
    .setBackground("#D4EDDA").setFontColor("#155724");
  rowNum++;

  if (comingEntries.length > 0) {
    for (var ci = 0; ci < comingEntries.length; ci++) {
      dashboard.getRange("A" + rowNum + ":B" + rowNum).merge();
      dashboard.getRange("A" + rowNum).setValue((ci + 1) + ".");
      dashboard.getRange("C" + rowNum + ":E" + rowNum).merge();
      dashboard.getRange("C" + rowNum).setValue(comingEntries[ci].name);
      dashboard.getRange("F" + rowNum).setValue(comingEntries[ci].count + " адам")
        .setFontSize(9).setFontColor("#666666").setHorizontalAlignment("center");
      rowNum++;
    }
  } else {
    dashboard.getRange("A" + rowNum + ":F" + rowNum).merge();
    dashboard.getRange("A" + rowNum).setValue("Әзірге ешкім жоқ").setFontColor("#888888");
    rowNum++;
  }

  rowNum++;

  // КЕЛМЕЙТІНДЕР
  dashboard.getRange("A" + rowNum + ":F" + rowNum).merge();
  dashboard.getRange("A" + rowNum).setValue("КЕЛМЕЙТІНДЕР ТІЗІМІ")
    .setFontWeight("bold").setFontSize(13)
    .setBackground("#F8D7DA").setFontColor("#721C24");
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
  dashboard.setColumnWidth(1, 35);
  dashboard.setColumnWidth(2, 35);
  dashboard.setColumnWidth(3, 160);
  dashboard.setColumnWidth(4, 160);
  dashboard.setColumnWidth(5, 160);
  dashboard.setColumnWidth(6, 90);

  // Высота строк
  dashboard.setRowHeight(1, 45);
  dashboard.setRowHeight(3, 28);
  dashboard.setRowHeight(4, 65);
  dashboard.setRowHeight(5, 18);
  dashboard.setRowHeight(7, 28);
  dashboard.setRowHeight(8, 55);
  dashboard.setRowHeight(9, 18);
}

function indexOfHeader(headers, text, fallback) {
  for (var i = 0; i < headers.length; i++) {
    if (headers[i] && headers[i].toString().indexOf(text) !== -1) return i;
  }
  return fallback;
}

// ============================================================
//  ПЕРВОНАЧАЛЬНАЯ НАСТРОЙКА (запустить ОДИН раз)
// ============================================================
function setupDashboard() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Основной лист "Ответы"
  var sheet = ss.getSheetByName("Ответы");
  if (!sheet) {
    sheet = ss.insertSheet("Ответы");
  }
  sheet.clear();

  // Заголовки
  var headers = ["Дата и время", "Есім", "Статус", "Қонақ саны", "Категория", "Барлық есімдер"];
  sheet.getRange("A1:F1").setValues([headers]);
  sheet.getRange("A1:F1")
    .setFontWeight("bold")
    .setFontSize(11)
    .setBackground("#4A154B")
    .setFontColor("#FFFFFF")
    .setHorizontalAlignment("center");

  sheet.setColumnWidth(1, 170);
  sheet.setColumnWidth(2, 170);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 110);
  sheet.setColumnWidth(5, 130);
  sheet.setColumnWidth(6, 300);

  // Условное форматирование для столбца C (Статус)
  var range = sheet.getRange("C2:C");

  var greenRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Келеді")
    .setBackground("#D4EDDA").setFontColor("#155724")
    .setRanges([range]).build();

  var blueRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Жұбайымен келеді")
    .setBackground("#D1ECF1").setFontColor("#0C5460")
    .setRanges([range]).build();

  var redRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Келмейді")
    .setBackground("#F8D7DA").setFontColor("#721C24")
    .setRanges([range]).build();

  sheet.setConditionalFormatRules([greenRule, blueRule, redRule]);

  updateDashboard();

  SpreadsheetApp.getUi().alert("Таблица готова!\n\nЛист «Ответы» — все ответы гостей\nЛист «Дашборд» — красивая статистика\n\nТеперь обнови развёртывание: Развернуть → Управление развертываниями → ✎ → Версия: Новая → Развернуть");
}