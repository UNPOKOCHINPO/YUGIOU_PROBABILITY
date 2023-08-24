function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function want_1card(a_s, hands, dontwant = []) {
    for (let a of a_s) {
        if (hands.includes(a)) {
            return true;
        }
    }
    return false;
}

function want_combi_of_2cards(a_s, b_s, hands, dontwant = []) {
    for (let a of a_s) {
        for (let b of b_s) {
            if (a === b) {
                continue;
            }

            if (hands.includes(a) && hands.includes(b)) {
                let alldontwant = true;
                if (dontwant.length === 0) {
                    alldontwant = false;
                }
                for (let dw of dontwant) {
                    if (!hands.includes(dw)) {
                        alldontwant = false;
                    }
                }

                if (!alldontwant) {
                    return true;
                }
            }
        }
    }
    return false;
}

function want_combi_of_3cards(a_s, b_s, c_s, hands, dontwant = []) {
    for (let a of a_s) {
        for (let b of b_s) {
            for (let c of c_s) {
                if (a === b || b === c || c === a) {
                    continue;
                }

                if (hands.includes(a) && hands.includes(b) && hands.includes(c)) {
                    let alldontwant = true;
                    if (dontwant.length === 0) {
                        alldontwant = false;
                    }
                    for (let dw of dontwant) {
                        if (!hands.includes(dw)) {
                            alldontwant = false;
                        }
                    }

                    if (!alldontwant) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function calcProb(drawnum = 100000, n = 40, one = 9, two1 = 3, two2 = 4, three1 = 3, three2 = 3, three3 = 3, hdnum = 5) {
    const deck = [...Array(n).keys()]; // Deck of cards numbered
    const one_list = [...Array(one).keys()]; // 1-card starters

    const two1_list = [...Array(two1).keys()].map(i => i + one); // 2-card starters
    const two2_list = [...Array(two2).keys()].map(i => i + one + two1);

    const two = two1 + two2;

    const three1_list = [...Array(three1).keys()].map(i => i + one + two);
    const three2_list = [...Array(three2).keys()].map(i => i + one + two + three1);
    const three3_list = [...Array(three3).keys()].map(i => i + one + two + three1 + three2);

    const three = three1 + three2 + three3;

    let cnt = 0;
    for (let _ = 0; _ < drawnum; _++) {
        let ok = false;
        const hands = [];
        while (hands.length < hdnum) {
            const card = getRandomInt(n);
            if (!hands.includes(card)) {
                hands.push(card);
            }
        }

        if (want_1card(one_list, hands)) {
            ok = true;
        }
        if (want_combi_of_2cards(two1_list, two2_list, hands)) {
            ok = true;
        }
        if (want_combi_of_3cards(three1_list, three2_list, three3_list, hands)) {
            ok = true;
        }
        if (ok) {
            cnt++;
        }
    }

    return (cnt / drawnum * 100).toFixed(2)
}
