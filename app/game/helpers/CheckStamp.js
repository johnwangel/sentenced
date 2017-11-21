import Verb from './Verbs';
import Noun from './Nouns';

class CheckStamp {
  constructor(stamp, selection) {
    this.stamp = stamp;
    this.selection = selection;
  }

  test() {
    switch (this.selection.pos) {
      case 'verb':
        var v = new Verb(this.stamp, this.selection);
        return v.test();
      case 'noun':
        var n = new Noun(this.stamp, this.selection);
        return n.test();
      default:
        return false;
    }
  }
}

export default CheckStamp;