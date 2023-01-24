function calculate() {
    let payers = [new SpecificPayer()];
    let activeSheet = SpreadsheetApp.getActive();
    let sheets = activeSheet.getSheets();
    let overview = sheets[0];
  
    for (let sheetIndex = 1; sheetIndex < sheets.length; sheetIndex = sheetIndex + 1) {
      let sheet = sheets[sheetIndex];
      var values = sheet.getDataRange().getValues();
      for (let rowIndex = FIRST_ROW_INDEX; rowIndex <= getLastRowIndex(sheet); rowIndex = rowIndex + 1) {
        let price = values[rowIndex][COLUMNS.ID.PRICE];
        let paid = values[rowIndex][COLUMNS.ID.PAID];
        let whoPaid = values[rowIndex][COLUMNS.ID.WHO_PAID];
        let onSite = values[rowIndex][COLUMNS.ID.PAY_ON_LOCATION];
  
        payers.forEach(payer => payer.add(price, paid, whoPaid, onSite));
      }
  
      payers.forEach(payer => payer.calculateSums());
      payers.forEach(payer => this.writeValuesToSheet(overview, payer));
    }
  }
  
  function writeValuesToSheet(sheet, payer) {
    writeValueToCell(sheet, payer.getOnSiteCell(), payer.getOnSiteSum());
    writeValueToCell(sheet, payer.getOffSiteCell(), payer.getOffSiteSum());
    writeValueToCell(sheet, payer.getPaidCell(), payer.getPaidSum());
  }
  
  function getLastRowIndex(sheet) {
    return sheet.getLastRow() - 1;
  }
  
  function writeValueToCell(sheet, notation, value) {
    sheet.getRange(notation).setValue(value);
  }
  
  function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu(MENU_NAME)
        .addItem(MENU_ITEM_NAME, FUNCTION_IN_MENU)
        .addToUi();
  }
  
  function hello() {
    Browser.msgBox("Hello");
  }
  
  function removeMenuItem() {
    SpreadsheetApp.getActiveSpreadsheet().removeMenu(MENU_NAME);
  }