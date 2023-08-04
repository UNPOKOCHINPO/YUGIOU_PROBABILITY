function combi(n, r) {
    let ret = 1;
    for (let i = 0; i < r; i++) {
        ret *= n - i;
        ret = Math.floor(ret / (i + 1));
    }
    return ret;
}

function p(n, m, i) {
    return (combi(m, i) * combi(n - m, 5 - i)) / combi(n, 5);
}

function get_list_of_hands_prob(n, m_in_deck) {
    let hands_prob = [];
    for (let m_want = 0; m_want < 6; m_want++) {
        const probability = p(n, m_in_deck, m_want) * 100;
        hands_prob.push(probability);
    }
    return hands_prob;
}
