// Liste des notes sur 20 aux exams d'un étudiant fictif
const marksExams = [
    12, 7, 15, 18, 6, 16, 19, 9
];

// Liste des notes sur 10 aux exercices pratiques d'un étudiant fictif
const marksTP = [
    7, 2.5, 3.5, 8, 6.5
];


let marksOn20 = [...marksExams, ...marksTP.map(mark => mark*2) ];

let marksBelow8 = marksOn20.filter(mark => mark <= 8);

let meanMarks = marksOn20.reduce((sum, mark) => sum + mark, 0) / marksOn20.length;

console.log(marksOn20);
console.log(marksBelow8);
console.log(meanMarks);
