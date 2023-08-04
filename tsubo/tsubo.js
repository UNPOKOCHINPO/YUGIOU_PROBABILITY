function combi(n, r) {
    let ret = 1;
    for (let k = 0; k < r; k++) {
        ret *= (n - k) / (r - k);
    }
    return ret;
}

// 強欲な壺
function goyoku_draw(n, m) {
    // 初手ですでに欲しいカードがある場合
    let prob = 1 - combi(n - m, 5) / combi(n, 5);

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

    return prob;
}

// 強欲で貪欲な壺
function godon_draw(n, m) {
    // 初手ですでに欲しいカードがある場合
    let prob = 1 - combi(n - m, 5) / combi(n, 5);

    // 初手に欲しいカードがない場合
    for (let i = 1; i <= 3; i++) {
        let sum = 0;
        for (let j = Math.min(10, m - 1); j >= 0; j--) {
            sum += (combi(m, j) * combi(n - m - 5, 10 - j) / combi(n - 5, 10)) * (1 - combi(n - m - 15 + j, 2) / combi(n - 15, 2));
        }
        prob += (combi(3, i) * combi(n - m - 3, 5 - i) / combi(n, 5)) * sum;
    }

    return prob;
}

// 金満で謙虚な壺
function kinken_draw(n, m) {
    // 初手ですでに欲しいカードがある場合
    let prob = 1 - combi(n - m, 5) / combi(n, 5);

    // 初手に欲しいカードがない場合
    for (let i = 1; i <= 3; i++) {
        prob += (combi(3, i) * combi(n - m - 3, 5 - i) / combi(n, 5)) * (1 - combi(n - m - 5, 6) / combi(n - 5, 6));
    }

    return prob;
}

// 強欲で金満な壺
function gokin_draw(n, m) {
    // 初手ですでに欲しいカードがある場合
    let prob = 1 - combi(n - m, 5) / combi(n, 5);

    // 初手に欲しいカードがない場合
    for (let i = 1; i <= 3; i++) {
        prob += (combi(3, i) * combi(n - m - 3, 5 - i) / combi(n, 5)) * (1 - combi(n - m - 5, 2) / combi(n - 5, 2));
    }

    return prob;
}
