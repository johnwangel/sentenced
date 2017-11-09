import Verb from './Verbs';
import Noun from './Nouns';


class Drop {
  constructor(original, replacement) {
    this.original = original;
    this.replacement = replacement;
    this.oWord = original.word;
    this.oPOS = original.pos;
    this.rWord = replacement.tile.word;
    this.rPOS = replacement.tile.pos;
  }

  checkDrop() {
    if ( this.oPOS === this.rPOS ) {
      switch(this.oPOS){
        case 'verb':
          var v = new Verb(null, null, this.original, this.replacement);
          return v.checkDrop();

        default:
          return true;
      }
    }
    return false;
  }

}

export default Drop;