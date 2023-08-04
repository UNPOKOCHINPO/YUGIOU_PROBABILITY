function combi(n, r) {
    let ret = 1;
    for (let k = 0; k < r; k++) {
        ret *= (n - k) / (r - k);
    }
    return ret;
}

// 強欲な壺
function goyoku_draw(n, m, k) {
    // 初手ですでに欲しいカードがある場合
    let prob = 1 - combi(n - m, 5) / combi(n, 5);

    if (k == 3) {
        // 初手に欲しいカードがない場合(1段)
        for (let i = 1; i <= 3; i++) {
            prob += (combi(3, i) * combi(n - m - 3, 5 - i) / combi(n, 5)) * (1 - combi(n - m - 5, 2 * i) / combi(n - 5, 2 * i));
        }

        // 初手に欲しいカードがない場合(2段)
        prob += (combi(3, 1) * combi(n - m - 3, 4) / combi(n, 5)) * (combi(2, 1) * combi(n - m - 7, 1) / combi(n - 5, 2)) * (1 - combi(n - m - 7, 2) / combi(n - 7, 2));
        prob += (combi(3, 1) * combi(n - m - 3, 4) / combi(n, 5)) * (combi(2, 2) / combi(n - 5, 2)) * (1 - combi(n - m - 7, 4) / combi(n - 7, 4));
        prob += (combi(3, 2) * combi(n - m - 3, 3) / combi(n, 5)) * (combi(1, 1) * combi(n - m - 6, 3) / combi(n - 5, 4)) * (1 - combi(n - m - 9, 2) / combi(n - 9, 2));

        // 初手に欲しいカードがない場合(3段)
        prob += (combi(3, 1) * combi(n - m - 3, 4) / combi(n, 5)) * (combi(2, 1) * combi(n - m - 7, 1) / combi(n - 5, 2)) * (combi(1, 1) * combi(n - m - 8, 1) / combi(n - 7, 2)) * (1 - combi(n - m - 9, 2) / combi(n - 9, 2));
    } else if (k == 2) {

        // 初手に欲しいカードがない場合(1段)
        for (let i = 1; i <= 2; i++) {
            prob += (combi(2, i) * combi(n - m - 2, 5 - i) / combi(n, 5)) * (1 - combi(n - m - 5, 2 * i) / combi(n - 5, 2 * i));
        }

        // 初手に欲しいカードがない場合(2段)
        prob += (combi(2, 1) * combi(n - m - 2, 4) / combi(n, 5)) * (combi(1, 1) * combi(n - m - 6, 1) / combi(n - 5, 2)) * (1 - combi(n - m - 7, 2) / combi(n - 7, 2));
    } else if (k == 1) {
        return godon_draw(n, m, k);
    }
    return prob;
}

// 強欲で貪欲な壺
function godon_draw(n, m, k) {
    // 初手ですでに欲しいカードがある場合
    let prob = 1 - combi(n - m, 5) / combi(n, 5);

    // 初手に欲しいカードがない場合
    for (let i = 1; i <= k; i++) {
        let sum = 0;
        // j枚欲しいカードがコストで飛び、その後の2ドローで欲しいカードを引く確率の総和
        for (let j = Math.min(10, m - 1); j >= 0; j--) {
            sum += (combi(m, j) * combi(n - m - 5, 10 - j) / combi(n - 5, 10)) * (1 - combi(n - m - 15 + j, 2) / combi(n - 15, 2));
        }
        // 壺をi枚引いている + 上の確率の積
        prob += (combi(k, i) * combi(n - m - k, 5 - i) / combi(n, 5)) * sum;
    }

    return prob;
}

// 金満で謙虚な壺
function kinken_draw(n, m, k) {
    // 初手ですでに欲しいカードがある場合
    let prob = 1 - combi(n - m, 5) / combi(n, 5);

    // 初手に欲しいカードがない場合
    for (let i = 1; i <= k; i++) {
        prob += (combi(k, i) * combi(n - m - k, 5 - i) / combi(n, 5)) * (1 - combi(n - m - 5, 6) / combi(n - 5, 6));
    }

    return prob;
}

// 強欲で金満な壺
function gokin_draw(n, m, k) {
    // 初手ですでに欲しいカードがある場合
    let prob = 1 - combi(n - m, 5) / combi(n, 5);

    // 初手に欲しいカードがない場合
    for (let i = 1; i <= k; i++) {
        prob += (combi(k, i) * combi(n - m - k, 5 - i) / combi(n, 5)) * (1 - combi(n - m - 5, 2) / combi(n - 5, 2));
    }

    return prob;
}
