class Verb {
  constructor(stamp, selection) {
    this.stamp = stamp;
    this.selection = selection;
  }

  test() {

    switch (this.stamp) {
      case 'Make Third Person Singular':
        let word = '';
        if (this.selection.present_tense_third_person_singular){
          word = this.selection.present_tense_third_person_singular;
        } else {
          word = this.selection.word;
          let lastLetter = word.slice(word.length-1);
          let l2 = word.slice(word.length-2, word.length-1);
          let vowelBefore = false;
          if (l2 === 'a' || l2 === 'e' || l2 === 'i' || l2 === 'o' || l2 === 'u' ) vowelBefore = true;
          if (lastLetter === 'y' && !vowelBefore){
            word = word.slice(0, word.length-1) + 'ies';
          } else {
            word = word + 's';
          }
        }
        this.selection.word = word;
        this.selection.person = 'third';
        this.selection.gender = 'neuter';
        this.selection.number = 'singular';
        this.selection.tense = 'present';
        return this.selection;
      default:
        console.log("GOT HERE BUT FALSE")
        return false;
    }
  }

}
export default Verb;