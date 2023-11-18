import random
import numpy as np
import matplotlib.pyplot as plt


n1,n2,n3=map(int,input("input values > ").split())
print(n1,n2,n3)

def calcProb(n1,n2,n3,drawnum=100000, hdnum=5):
    n = n1+n2+n3
    one = [i for i in range(n1) for j in range(1)]
    two = [i for i in range(n1,n1+n2) for j in range(2)]
    three = [i for i in range(n1+n2,n1+n2+n3) for j in range(3)]
    deck = one+two+three
    
    no_pair, one_pair, two_pair, three_card, full_house = 0,0,0,0,0
    for _ in range(drawnum):
        counter = [0 for i in range(n)]
        hands = random.sample(deck,hdnum)

        for h in hands:
            counter[h] += 1
        
        num_one = counter.count(1)
        num_two = counter.count(2)
        num_three = counter.count(3)
        
        assert(num_one*1+num_two*2+num_three*3==5)

        if num_one==5:
            no_pair += 1
        elif num_one==3 and num_two==1:
            one_pair += 1
        elif num_one==1 and num_two==2:
            two_pair += 1
        elif num_one==2 and num_three==1:
            three_card += 1
        elif num_two==1 and num_three==1:
            full_house += 1

    probs = [no_pair*100/drawnum, one_pair*100/drawnum,two_pair*100/drawnum,three_card*100/drawnum,full_house*100/drawnum]
    print(probs)
    
    plt.bar([i for i in range(len(probs))], probs)
    plt.xticks([i for i in range(len(probs))], ["no_pair","one_pair","two_pair","three_cards","full_house"])
    plt.xlabel("hand")
    plt.ylabel("probability")
    plt.show()


calcProb(n1,n2,n3)