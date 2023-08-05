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

function find_best_balance_of_deck(n, m_want) {
    let best_m_in_deck = 0;
    let best_draw_counter = 0;

    for (let m_in_deck = 0; m_in_deck <= n; m_in_deck++) {
        const success_prob = p(n, m_in_deck, m_want);

        if (best_draw_counter < success_prob) {
            best_draw_counter = success_prob;
            best_m_in_deck = m_in_deck;
        }
    }

    return best_m_in_deck;
}

function get_list_of_hands_prob(n, m_in_deck) {
    let hands_prob = [];
    for (let m_want = 0; m_want < 6; m_want++) {
        const probability = p(n, m_in_deck, m_want) * 100;
        hands_prob.push(probability);
    }
    return hands_prob;
}
