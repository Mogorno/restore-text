import { TextRestorer } from './TextRestorer';
// const DICTIONARY = fs
//     .readFileSync('/src/dictionary.txt', 'utf-8')
//     .toLowerCase()
//     .split('\n')
//     .map((word) => word.trim())
//     .filter((word) => word.length > 2);
// const dictionary = ['hello', 'Hello', 'Hell', 'hell', '!', 'word', 'Word'];
const dictionary = [
    'alice',
    'was',
    'beginning',
    'to',
    'get',
    'very',
    'tired',
    'of',
    'sitting',
    'by',
    'her',
    'sister',
    'on',
    'the',
    'bank',
    'and',
    'having',
    'nothing',
    'do',
    'once',
    'or',
    'twice',
    'she',
    'had',
    'peeped',
    'into',
    'book',
    'reading',
    'but',
    'it',
    'no',
    'pictures',
    'conversations',
    'in',
    'what',
    'is',
    'use',
    'thought',
    'without',
];
const input = `A***ew*sbegninignt*g*tv***tried*F*s***ing*y*e*srtseionthebnkaadnofvhaingntohnigtoD*`;
const textRestorer = new TextRestorer(dictionary);
const restoredText = textRestorer.restoreText(input);
console.log(restoredText);
//Alice was beginning to get very tired of sitting by her sister on the bank and of having nothing to do
//Alice was beginning get very tired oF sitting very sister into her bank and of having nothing to anD
//Alice was beginning get to very tired oF was having very sister on the bank and of having nothing to Do
//Alice was beginning get to very tired oF was having very sister on the bank and of having nothing to Do
//Alice was beginning get to very tired oF was having very sister on the bank and of having nothing to Do
