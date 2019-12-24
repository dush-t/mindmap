from nltk.corpus import wordnet as wn

def get_word_type(word):
    pos_l = set()
    for tmp in wn.synsets(word):
        if tmp.name().split('.')[0] == word:
            pos_l.add(str(tmp.pos()))
    return list(pos_l)

print(get_word_type('peaceful'))