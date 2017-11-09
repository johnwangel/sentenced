class Adjective {
  constructor(stamp, selection) {
    this.stamp = stamp;
    this.selection = selection;
  }

  test() {

  }

}

export default Adjective;




//     func makeComparative(adjID: String) -> String {

//         let myDB = DatabaseQueries()
//         let myQuery = "SELECT * FROM adjectives WHERE adjID = " + adjID
//         let myAdjective = myDB.queryDB(myQuery: myQuery, myColumn: "word")
//         let compare = myDB.queryDB(myQuery: myQuery, myColumn: "comparative")
//         var myNewAdj: String = ""

//         if compare == "1" {
//             if (myAdjective.characters.last! == "y"){
//                 myNewAdj = String(myAdjective.characters.dropLast(1)) + "ier"
//             } else if (myAdjective.characters.last! == "e"){
//                     myNewAdj = String(myAdjective.characters.dropLast(1)) + "er"
//             } else if (checkVowCons(theWord: myAdjective) == true){
//                     let myVowel = String(myAdjective.characters.last!)
//                     myNewAdj = myAdjective + myVowel + "er"
//             } else {
//                 myNewAdj = myAdjective + "er"
//             }
//         } else if compare == "2" {
//             myNewAdj = "more " + myAdjective
//         } else if compare == "0" {
//             myNewAdj = myAdjective
//         } else {
//             myNewAdj = compare
//         }
//         return myNewAdj
//     }

//     func makeSuperlative(adjID: String) -> String {

//         let myDB = DatabaseQueries()
//         let myQuery = "SELECT * FROM adjectives WHERE adjID = " + adjID
//         let myAdjective = myDB.queryDB(myQuery: myQuery, myColumn: "word")
//         let compare = myDB.queryDB(myQuery: myQuery, myColumn: "superlative")
//         var myNewAdj: String = ""

//         if compare == "1" {
//             if (myAdjective.characters.last! == "y"){
//                 myNewAdj = String(myAdjective.characters.dropLast(1)) + "iest"
//             } else if (myAdjective.characters.last! == "e"){
//                 myNewAdj = String(myAdjective.characters.dropLast(1)) + "est"
//             } else if (checkVowCons(theWord: myAdjective) == true){
//                 let myVowel = String(myAdjective.characters.last!)
//                 myNewAdj = myAdjective + myVowel + "est"
//             } else {
//                 myNewAdj = myAdjective + "est"
//             }
//         } else if compare == "2" {
//             myNewAdj = "most " + myAdjective
//         } else if compare == "0" {
//             myNewAdj = myAdjective
//         } else {
//             myNewAdj = compare
//         }
//         return myNewAdj
//     }

//     func checkVowCons(theWord: String) -> Bool {

//         var lastIsConsonant: Bool = false
//         var secondIsVowel: Bool = false
//         var thirdIsVowel: Bool = false

//         let last_char = String(theWord.characters.last!)

//         var second_to_last_char = String(theWord.characters.dropLast(1))
//         second_to_last_char = String(second_to_last_char.characters.last!)

//         var third_to_last_char = String(theWord.characters.dropLast(2))
//         third_to_last_char = String(third_to_last_char.characters.last!)

//         let consonants = CharacterSet(charactersIn: "bcdfgjklmnpqrstvwxz")
//         let vowels = CharacterSet(charactersIn: "aeiou")

//         if last_char.rangeOfCharacter(from: consonants) != nil {
//             lastIsConsonant = true
//         }
//         if second_to_last_char.rangeOfCharacter(from: vowels) != nil {
//             secondIsVowel = true
//         }
//         if third_to_last_char.rangeOfCharacter(from: vowels) != nil {
//             thirdIsVowel = true
//         }
//         if (lastIsConsonant == true && secondIsVowel == true && thirdIsVowel == false) {
//             return true
//         } else {
//             return false
//         }
//     }
