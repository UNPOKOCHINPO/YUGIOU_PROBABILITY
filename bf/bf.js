function want_combi_of_2cards(a_s, b_s, hands, dontwant = []) {
    for (const a of a_s) {
        for (const b of b_s) {
            if (a === b) { // 同じカードは引けない
                continue;
            }

            if (hands.includes(a) && hands.includes(b)) {
                let alldontwant = true; // いらんカード全部引いたらtrue
                if (dontwant.length === 0) {
                    alldontwant = false;
                }
                for (const dw of dontwant) {
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
    if (dontwant.length == 0) {
        return false;
    }
    for (const a of a_s) {
        for (const b of b_s) {
            for (const c of c_s) {
                if (a === b || b === c || c === a) {
                    continue;
                }

                if (hands.includes(a) && hands.includes(b) && hands.includes(c)) {
                    let alldontwant = true; // いらんカード全部引いたらtrue
                    if (dontwant.length === 0) {
                        alldontwant = false;
                    }
                    for (const dw of dontwant) {
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

function calcSmallWorldProb(drawnum = 100000, n = 40, bfm = 17, smnum = 2, radnum = 1, hdnum = 5) {
    const deck = [...Array(n).keys()]; // デッキのカードを番号付け
    const otherBFMonsters = [...Array(bfm - 3).keys()].map(i => i + 3); // シムーン3枚以外のbfモンスター
    const simoon = [0, 1, 2]; // シムーン3積み
    const suzuri = [3, 4, 5]; // スズリ3積み
    const smallWorld = [...Array(smnum).keys()].map(i => i + bfm); // スモワ0~3枚
    const radian = [...Array(radnum).keys()].map(i => i + bfm + smnum); // 多次元壊獣0~3枚
    const blackwind = [...Array(3).keys()].map(i => bfm + smnum + radnum + i); // 黒い旋風3積み

    let cnt = 0;
    for (let i = 0; i < drawnum; i++) {
        let ok = false;
        const hands = deck.sort(() => 0.5 - Math.random()).slice(0, hdnum); // handsにランダムにhdnum枚のカードを選ぶ

        if (want_combi_of_2cards(suzuri, blackwind, hands)) {
            ok = true;
        }
        if (want_combi_of_2cards(simoon, otherBFMonsters, hands)) {
            ok = true;
        }
        if (want_combi_of_3cards(otherBFMonsters, smallWorld, blackwind, hands, radian)) {
            ok = true;
        }
        if (want_combi_of_3cards(otherBFMonsters, otherBFMonsters, smallWorld, hands, radian)) {
            ok = true;
        }
        if (ok) {
            cnt += 1;
        }
    }

    return Math.round(cnt * 10000 / drawnum) / 100;
}

