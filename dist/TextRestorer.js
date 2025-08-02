export class TextRestorer {
    constructor(dictionary, options) {
        this.dictionary = dictionary;
        this.maxInaccuracy = 0;
        this.maxUnknowns = 3;
        this.maxWordLength = 10;
        this.minWordLength = 2;
        this.unknownSymbol = '*';
        options && this.setOptions(options);
    }
    setOptions(options) {
        this.maxInaccuracy = options.maxInaccuracy ?? this.maxInaccuracy;
        this.maxUnknowns = options.maxUnknowns ?? this.maxUnknowns;
        this.maxWordLength = options.maxWordLength ?? this.maxWordLength;
        this.minWordLength = options.minWordLength ?? this.minWordLength;
        this.unknownSymbol = options.unknownSymbol ?? this.unknownSymbol;
        return this;
    }
    setDictionary(dictionary) {
        this.dictionary = dictionary;
        return this;
    }
    restoreText(input) {
        const result = [];
        let i = 0;
        outer: while (i < input.length) {
            for (let len = this.maxWordLength; len >= this.minWordLength; len--) {
                const fragment = input.slice(i, i + len);
                const candidates = this.findCandidates(fragment);
                if (candidates.length > 0) {
                    result.push(candidates[0]);
                    i += len;
                    continue outer;
                }
            }
            i += 1;
        }
        return result.join(' ');
    }
    findCandidates(fragment) {
        let candidates = [];
        let minInaccuracy = this.maxInaccuracy;
        for (let dictWord of this.dictionary) {
            const candidate = this.fuzzyMatch(dictWord, fragment);
            if (candidate === null)
                continue;
            if (minInaccuracy > candidate.inaccuracy) {
                minInaccuracy = candidate.inaccuracy;
                candidates = [candidate.word];
            }
            if (minInaccuracy === candidate.inaccuracy)
                candidates.push(candidate.word);
        }
        return candidates;
    }
    fuzzyMatch(word, fragment) {
        if (word.length !== fragment.length)
            return null;
        const fragmentLowerCase = fragment.toLowerCase();
        const wordLowerCase = word.toLowerCase().split('');
        let repairedWord = word.split('');
        let inaccuracy = 0;
        let unknowns = 0;
        for (let i = 0; i < fragmentLowerCase.length; i++) {
            if (fragmentLowerCase[i] === this.unknownSymbol) {
                unknowns++;
                continue;
            }
            const index = wordLowerCase.indexOf(fragmentLowerCase[i]);
            if (index === -1)
                inaccuracy++;
            else {
                wordLowerCase[index] = null;
                repairedWord[index] = fragment[i];
            }
            if (inaccuracy > this.maxInaccuracy || unknowns > this.maxUnknowns)
                return null;
        }
        return { word: repairedWord.join(''), inaccuracy };
    }
}
