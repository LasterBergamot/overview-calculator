const YES = "Y";

class Payer {
  constructor() {
    this.prices = {};
    this.prices.onSite = [],
    this.prices.offSite = [],
    this.prices.paid = []

    this.sums = {};
    this.sums.onSite = 0;
    this.sums.offSite = 0;
    this.sums.paid = 0;

    this.overviewCells = {};
  }

  add(price, paid, whoPaid, onSite) {
    if (whoPaid != this.whoPaid) {
      return;
    }

    if (paid == YES) {
        this.prices.paid.push(price);
    } else {
      if (onSite == YES) {
        this.prices.onSite.push(price);
      } else {
        this.prices.offSite.push(price);
      }
    }
  }

  calculateSums() {
    this.sums.onSite = this.calculateSum(this.prices.onSite);
    this.sums.offSite = this.calculateSum(this.prices.offSite);
    this.sums.paid = this.calculateSum(this.prices.paid);
  }

  calculateSum(listOfValues) {
    return listOfValues.reduce((a, b) => a + b, 0);
  }

  getOnSiteCell() {
    return this.overviewCells.onSite;
  }

  getOnSiteSum() {
    return this.sums.onSite;
  }

  getOffSiteCell() {
    return this.overviewCells.offSite;
  }

  getOffSiteSum() {
    return this.sums.offSite;
  }

  getPaidCell() {
    return this.overviewCells.paid;
  }

  getPaidSum() {
    return this.sums.paid;
  }
}