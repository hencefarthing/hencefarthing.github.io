# Fuzzy Searching

What is it? Basically, trying to match words that are spelled differently, weather this is because someone misspelled on accident or because translation between languages can be difficult to do 100% accurately, especially when translating between languages using entirely different characters. I'm particularly interested in this because I just tried to match 21,000 spreadsheet rows to data existing in a database. If I used only a basic matching algorith (ex: exact match), I would get many false negatives because people often misspell names, especially when names are spelled in different languages or get converted between Arabic and English, which use entirely different symbols.

So on this quest to find a better fuzzy searching algorithm, I came across these links that seem to be useful:

Wikis:
1) https://en.wikipedia.org/wiki/Levenshtein_distance - what this whole thing is based off of
1) https://en.wikipedia.org/wiki/Edit_distance - similar concept
1) https://en.wikipedia.org/wiki/Levenshtein_automaton - may be more practical for my specific needs
   - quote from wiki: "Levenshtein automata may be used for spelling correction, by finding words in a given dictionary that are close to a misspelled word."
   - Looks like this is: 1) calculate / build a tree of all strings that are `x` distance from the original string, 2) see if search-string matches any branch from the tree.
   - Source code linked to in the article is crazy long (and in Python) so I'd rather not take the time to understand it completely :( - for now
1) https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance - this may be it (for reals)
   - paraphase: "In computer science, the Damerau–Levenshtein distance is a metric for measuring the edit distance between two sequences (strings). The "edit distance" between two words is the minimum number of operations (consisting of insertions, deletions or substitutions of a single character, or transposition of two adjacent characters) required to change one word into the other."
1) https://en.wikipedia.org/wiki/Wagner%E2%80%93Fischer_algorithm
   - computer algorithm for calculating edit distance

Other blogs:
1) http://blog.notdot.net/2007/4/Damn-Cool-Algorithms-Part-1-BK-Trees - maybe just theory
   - points to this research paper: https://dl.acm.org/citation.cfm?id=362003.362025
   - starts nice, but the end gets confusing when explaining how the algorithm works
   - the part I can take from this is some clarifications of the Levenshtein distance - maybe this is the direction I need to go
2) http://blog.notdot.net/2010/07/Damn-Cool-Algorithms-Levenshtein-Automata - not sure yet
3) https://www.elastic.co/blog/found-fuzzy-search - maybe only useful when also using some expensive software
4) Introduction to data retrieval - via stanford.edu: https://nlp.stanford.edu/IR-book/
   - Edit distance: https://nlp.stanford.edu/IR-book/html/htmledition/edit-distance-1.html
   - Phonetic correction: https://nlp.stanford.edu/IR-book/html/htmledition/phonetic-correction-1.html#sec:soundex
   - Extra references & some history: https://nlp.stanford.edu/IR-book/html/htmledition/references-and-further-reading-3.html

Heuristic: proceeding to a solution by trial and error or by rules that are only loosely defined.
A few possible heuristics:
1) Restrict search to terms beginning with the same letter as the query string
   - pretty useful, but will sometimes fail on "Abd..." or maybe "Al..." / "El..."

Existing Algorithms:
1) https://gist.github.com/IceCreamYou/8396172 - javascript
2) https://gist.github.com/doukremt/9473228 - C (**weighted edits possible**)
   - JS converted: https://stackoverflow.com/questions/22308014/damerau-levenshtein-distance-implementation
3) http://jsfiddle.net/soulwire/zf464/ - editable
4) https://www.npmjs.com/package/damerau-levenshtein-js - node.js
5) https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#JavaScript - not sure
