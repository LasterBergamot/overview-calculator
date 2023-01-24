class SpecificPayer extends Payer {
    constructor() {
      super();
      
      this.whoPaid = "T";
      
      this.overviewCells.onSite = "B2";
      this.overviewCells.offSite = "B3";
      this.overviewCells.paid = "B4";
    }
  }