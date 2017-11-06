import Verb from './Verbs';

class CheckStamp {
  constructor(stamp, selection) {
    this.stamp = stamp;
    this.selection = selection;
  }

  test() {
    switch (this.selection.pos) {
      case "verb":
          var v = new Verb(this.stamp, this.selection);
          return v.test();
      default:
        return false;
    }
  }
}

export default CheckStamp;