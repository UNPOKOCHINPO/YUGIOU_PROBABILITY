function num_in_hands(a_s, hands) {
    let num = 0;
    for (let a of a_s) {
        if (hands.includes(a)) {
            num++;
        }
    }
    return num;
}

function calc(n, m1, m2, m3, chosen, m1_, m2_, m3_, trial_number = 10000) {
    let hands_num = 5;
    if (chosen == 'second') {
        hands_num = 6;
    }
    const deck = [...Array(n).keys()];
    const m1_list = [...Array(m1).keys()];
    const m2_list = [...Array(m2).keys()].map(i => i + m1);
    const m3_list = [...Array(m3).keys()].map(i => i + m1 + m2);

    let cnt = 0;
    for (let _ = 0; _ < trial_number; _++) {
        const hands = deck.sort(() => 0.5 - Math.random()).slice(0, hands_num);
        if (num_in_hands(m1_list, hands) >= m1_ && num_in_hands(m2_list, hands) >= m2_ && num_in_hands(m3_list, hands) >= m3_) cnt++;
    }

    return (cnt / trial_number * 100).toFixed(2)
}
