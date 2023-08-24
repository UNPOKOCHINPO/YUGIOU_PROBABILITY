from random import sample


def want_1card(a_s, hands, dontwant=[]):
    for a in a_s:
        if a in hands:
            return True
    return False


def want_combi_of_2cards(a_s, b_s, hands, dontwant=[]):

    for a in a_s:
        for b in b_s:
            if a == b:  # 同じカードは引けない
                continue

            if a in hands and b in hands:

                alldontwant = True  # いらんカード全部引いたらtrue
                if len(dontwant) == 0:
                    alldontwant = False
                for dw in dontwant:
                    if dw not in hands:
                        alldontwant = False

                if not alldontwant:
                    return True
    return False


def want_combi_of_3cards(a_s, b_s, c_s, hands, dontwant=[]):

    for a in a_s:
        for b in b_s:
            for c in c_s:
                if a == b or b == c or c == a:
                    continue

                if a in hands and b in hands and c in hands:

                    alldontwant = True  # いらんカード全部引いたらtrue
                    if len(dontwant) == 0:
                        alldontwant = False
                    for dw in dontwant:
                        if dw not in hands:
                            alldontwant = False

                    if not alldontwant:
                        return True
    return False


# drawnum:試行回数
# n:デッキ枚数
# bfm:BFモンスターの合計数
# smnum:スモールワールドの数
# radnum:多次元壊獣ラディアンの数
# hdnum:手札の枚数（先攻なら5）

def calcProb(drawnum=100000, n=40, one=9, two1=3, two2=4, three1=3, three2=3, three3=3, hdnum=5):

    deck = [i for i in range(n)]  # デッキのカードを番号付け
    one_list = [i for i in range(one)]  # 1枚初動

    two1_list = [i+one for i in range(one, one+two1)]  # 2枚初動
    two2_list = [i+one+two1 for i in range(one+two1, one+two1+two2)]

    two = two1+two2

    three1_list = [i+one+two for i in range(one+two, one+two+three1)]
    three2_list = [
        i+one+two+three1 for i in range(one+two+three1, one+two+three1+three2)]
    three3_list = [
        i+one+two+three2 for i in range(one+two+three1+three2, one+two+three1+three2+three3)]

    three = three1+three2+three3

    cnt = 0
    for _ in range(drawnum):
        ok = False
        hands = sample(deck, hdnum)
        if want_1card(one_list, hands):
            ok = True
        if want_combi_of_2cards(two1_list, two2_list, hands):
            ok = True
        if want_combi_of_3cards(three1_list, three2_list, three3_list, hands):
            ok = True
        if ok:
            cnt += 1

    print(f"結果は\n>> {cnt/drawnum*100:.2f}%")


if __name__ == '__main__':
    print("1枚初動の枚数、２枚初動のカードそれぞれの枚数、３枚初動それぞれの枚数を半角空白区切りで入力")
    one, two1, two2, three1, three2, three3 = map(int, input().split())

    calcProb(one=one, two1=two1, two2=two2,
             three1=three1, three2=three2, three3=three3)
