class Noun {
  constructor(stamp, selection) {
    this.stamp = stamp;
    this.selection = selection;
  }

  test() {
    let noun = '';
    switch (this.stamp) {
        case 'Make Singular':


        case 'Make Plural':
            if (this.selection.plural) {
              noun = this.selection.plural;
            } else if (this.checkY(this.selection.word)){
              let w = this.selection.word;
              w = w.slice(0, this.selection.word.length-1);
              noun = w + "ies"
            } else if (this.checkH(this.selection.word)){
              noun = this.selection.word + "es"
            } else if (!this.selection.isPlural) {
              noun = this.selection.word + "s"
            } else {
              noun = this.selection.word
            }
            this.selection.word = noun;
            this.selection.pluralized = true;
            return this.selection;
        default:
            return false;
    }
  }

  checkY(word) {
    let lastLetter = word.slice(word.length-1);
    console.log('LAST LETTER ', lastLetter)
    let l2 = word.slice(word.length-2, word.length-1);
    console.log('L2 ', l2)
    let vowelBefore = false;
    if (l2 === 'a' || l2 === 'e' || l2 === 'i' || l2 === 'o' || l2 === 'u' ) vowelBefore = true;
    if (lastLetter === 'y' && !vowelBefore) return true;
    return false
  }

  checkH(word) {
    let lastLetter = word.slice(word.length-1);
    let l2 = word.slice(word.length-2, word.length-1);
    if ( l2 === 'c' || l2 === 's' ) consBefore = true;
    if (lastLetter === 'h' && consBefore) return true;
    return false;
  }

}

export default Noun;