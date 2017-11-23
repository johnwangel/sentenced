import Drop from './Drop';
import Styles from '../../css/styles.js';

class CheckZones {
  constructor(properties) {
      this.zones = properties.zones;
      this.original_word = properties.original_word;
      this.replacement_word = properties.replacement_word;
    }

  checkZones() {

    let drop_successful = false;

    this.zones.forEach( zone => {

      let z = zone.layout;

      let coordinates = {
        word: zone.properties.word,
        pos: zone.properties.pos,
        lower_x: z.x,
        higher_x: z.x + z.width,
        lower_y: z.y + Styles.space_above_sentence,
        higher_y: z.y + Styles.space_above_sentence + z.height,
        x_move: this.replacement_word.moveX,
        y_move: this.replacement_word.moveY,
      }

      if ( this.validDrop(coordinates) ){
        drop_successful = true;

        var dropTest = new Drop(zone.properties, this.replacement_word);
        if (dropTest.checkDrop()) {
            this.original_word.title = zone.properties.word;
            this.original_word.id = zone.id;

            if (zone.properties.updated) {
              this.replacement_word.updated = true;
            } else {
              this.replacement_word.update = true;
            }
        }
      }
    });
    return { drop_successful, replacement_word: this.replacement_word, original_word: this.original_word};
  }

  validDrop(c){
    console.log(`VALUE CHECK:
        ${c.word}
        ${c.x_move} > ${c.lower_x}
        ${c.x_move} < ${c.higher_x}
        ${c.y_move} > ${c.lower_y}
        ${c.y_move} < ${c.higher_y}
      `)
    if ( c.x_move > c.lower_x
          && c.x_move < c.higher_x
          && c.y_move > c.lower_y
          && c.y_move < c.higher_y
        ) {
      return true;
    }
    return false;
  }

}

export default CheckZones;