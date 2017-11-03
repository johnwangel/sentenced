class Drop {
  constructor(original, replacement) {
    this.oWord = original.word;
    this.oPOS = original.pos;
    this.rWord = replacement.tile.word;
    this.rPOS = replacement.tile.pos;
  }

  checkDrop() {
    if ( this.oPOS === this.rPOS ) return true;
    return false;
  }

}

export default Drop;