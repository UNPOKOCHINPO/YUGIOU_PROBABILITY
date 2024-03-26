def combi(n,k):
    ret = 1
    for i in range(k):
        ret = ret*(n-i)//(i+1)
    return ret

def P(d,wi,j,n):
    return combi(wi,j)*combi(n-wi,d-j)/combi(n,d)

def base_s(d,wi,c,n):
    num = 0
    dom = 0
    for j in range(1,wi+1):
        num += P(d,wi,j,n)*c[j-1]
        dom += P(d,wi,j,n)*10
    return num/dom
    
def Si(c1,c2,wi,n,maxxc=True):
    ret = base_s(5,wi,c1,n)/2
    if maxxc:
        ret += base_s(5,wi,c2,n)/2
    else:
        ret += base_s(6,wi,c2,n)/2
    return ret

def deck_Score(n, af_score_list, as_score_list, no_need_f,no_need_s,shotage_f,shotage_s):
    # 手札誘発の枚数を数えているだけ
    af_len, as_len = 0,0
    for i in range(len(af_score_list)):
        tmp = af_score_list[i]
        af_len += len(tmp[0])
    for i in range(len(as_score_list)):
        tmp = as_score_list[i]
        as_len += len(tmp[0])
    # ----------------------------
    
    
    f = 0
    s = 0

    # 手札誘発のスコア
    for scores in af_score_list:
        c1, c2 = scores
        wi_max = len(c1)
        for wi in range(1,wi_max+1):
            f += Si(c1,c2,wi,n,maxxc=True)

    # 後攻捲り札のスコア
    for scores in as_score_list:
        c1, c2 = scores
        wi_max = len(c1)
        for wi in range(1,wi_max+1):
            s += Si(c1,c2,wi,n,maxxc=False)


    # 誘発・捲り札を引きすぎたり、不足する場合の確率
    af_ng_list_no_need = [v for v in range(no_need_f,5+1)]
    af_ng_list_shotage = [v for v in range(shotage_f+1)]
    as_ng_list_no_need = [v for v in range(no_need_s,6+1)]
    as_ng_list_shotage = [v for v in range(shotage_s+1)]

    af_ng_prob_no_need = sum([P(5,af_len,j,n) for j in af_ng_list_no_need])
    af_ng_prob_shotage = sum([P(5,af_len,j,n) for j in af_ng_list_shotage])
    as_ng_prob_no_need = sum([P(6,as_len,j,n) for j in as_ng_list_no_need])
    as_ng_prob_shotage = sum([P(6,as_len,j,n) for j in as_ng_list_shotage])
    
    
    # 誘発のパワー（誘発が少なすぎると下がるので、全然引かない確率をベースにペナルティを付与）
    # + 元々のデッキパワー（誘発多すぎると下がるので、引きすぎる確率をベースにペナルティを付与）
    S_sub = ((1-af_ng_prob_shotage)*f+(1-as_ng_prob_shotage)*s)
    S_main = (n-af_len*af_ng_prob_no_need-as_len*as_ng_prob_no_need)
    S = S_sub + S_main

    print(af_len,f)
    print(as_len,s)
    print((n-af_len*af_ng_prob_no_need-as_len*as_ng_prob_no_need))
    
    return round(S*100/n,2)

def optimize_deck_Score(n, af_score_list, as_score_list, no_need_f,no_need_s,shotage_f,shotage_s):
    # 手札誘発の枚数を数えているだけ
    af_len, as_len = 0,0
    for i in range(len(af_score_list)):
        tmp = af_score_list[i]
        af_len += len(tmp[0])
    for i in range(len(as_score_list)):
        tmp = as_score_list[i]
        as_len += len(tmp[0])
    # ----------------------------
    
    
    f = 0
    s = 0

    f_List = []
    s_List = []
    # 手札誘発のスコア
    for scores_id in range(len(af_score_list)):
        c1, c2 = af_score_list[scores_id]
        for wi in range(1,3+1):
            f_List.append([Si(c1,c2,wi,n,maxxc=True),scores_id])

    f_List = sorted(f_List,reverse=True)
    # 後攻捲り札のスコア
    for scores_id in range(len(as_score_list)):
        c1, c2 = af_score_list[scores_id]
        for wi in range(1,3+1):
            s_List.append([Si(c1,c2,wi,n,maxxc=False),scores_id])
    s_List = sorted(s_List,reverse=True)

    print(f_List,s_List)

    # 誘発・捲り札を引きすぎたり、不足する場合の確率
    af_ng_list_no_need = [v for v in range(no_need_f,5+1)]
    af_ng_list_shotage = [v for v in range(shotage_f+1)]
    as_ng_list_no_need = [v for v in range(no_need_s,6+1)]
    as_ng_list_shotage = [v for v in range(shotage_s+1)]
    
    max_S = 0
    f_id_list = []
    s_id_list = []
    for f_id in range(len(f_List)):
        for s_id in range(len(s_List)):
            af_ng_prob_no_need = sum([P(5,f_id,j,n) for j in af_ng_list_no_need])
            af_ng_prob_shotage = sum([P(5,f_id,j,n) for j in af_ng_list_shotage])
            as_ng_prob_no_need = sum([P(6,s_id,j,n) for j in as_ng_list_no_need])
            as_ng_prob_shotage = sum([P(6,s_id,j,n) for j in as_ng_list_shotage])
            
            f = sum([f_List[i][0] for i in range(f_id+1)])
            s = sum([s_List[i][0] for i in range(s_id+1)])
            
            # 誘発のパワー（誘発が少なすぎると下がるので、全然引かない確率をベースにペナルティを付与）
            # + 元々のデッキパワー（誘発多すぎると下がるので、引きすぎる確率をベースにペナルティを付与）
            S_sub = ((1-af_ng_prob_shotage)*f+(1-as_ng_prob_shotage)*s)
            S_main = (n-f_id*af_ng_prob_no_need-s_id*as_ng_prob_no_need)
            S = S_sub + S_main

            if S>max_S:
                max_S=S
                f_id_list = [f_List[i][1] for i in range(f_id+1)]
                s_id_list = [s_List[i][1] for i in range(s_id+1)]


    print(s_id_list)
    print(f_id_list)
    print(round(max_S*100/n,2))

    return s_id_list,f_id_list,round(max_S*100/n,2)

def transform_score_list(score_list, detailed_setting=False):
    ret = []
    decline = 0.5
    if detailed_setting:
        for i in range(len(score_list)//2):
            ret.append([[score_list[2*i]*0.5**j for j in range(3)],[score_list[2*i+1]*0.5**j for j in range(3)]])
    else:
        for i in range(len(score_list)//6):
            ret.append([[score_list[6*i+j] for j in range(3)],[score_list[6*i+j] for j in range(3,6)]])
    return ret

if __name__=='__main__':
    no_need_f = 3
    no_need_s = 1
    shotage_f = 1
    shotage_s = 0
    assert(no_need_f>shotage_f)
    assert(no_need_s>shotage_s)

    af_score_list = [[[7,5,4],[4,3,1]],[[6,5,1],[5,4,4]],[[7,3,1],[4,3,1]],[[6,6,5],[2,1,0]],[[6,5,4],[4,3,1]],[[8,5,1],[5,4,4]],[[6,6,6],[5,5,5]],[[7,5,4],[4,3,1]],[[6,5,1],[5,4,4]],[[7,3,1],[4,3,1]],[[6,6,5],[2,1,0]]]
    as_score_list = [[[1,1,1],[10,9,4]],[[1,1,1],[10,9,9]]]


    optimize_deck_Score(40,af_score_list,as_score_list,no_need_f,no_need_s,shotage_f,shotage_s)