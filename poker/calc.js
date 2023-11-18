function calcProb(n1, n2, n3, drawnum = 100000, hdnum = 5) {
    const n = n1 + n2 + n3;
    let one = [];
    for (let i = 0; i < n1; i++) {
        for (let j = 0; j < 1; j++) {
            one.push(i);
        }
    }

    let two = [];
    for (let i = n1; i < n1 + n2; i++) {
        for (let j = 0; j < 2; j++) {
            two.push(i);
        }
    }

    let three = [];
    for (let i = n1 + n2; i < n1 + n2 + n3; i++) {
        for (let j = 0; j < 3; j++) {
            three.push(i);
        }
    }

    const deck = [...one, ...two, ...three];

    let no_pair = 0, one_pair = 0, two_pair = 0, three_card = 0, full_house = 0;

    for (let i = 0; i < drawnum; i++) {
        const counter = Array.from({ length: n }, () => 0);
        
        const hands = [];
        const indices = Array.from({ length: deck.length }, (_, i) => i);

        for (let i = 0; i < hdnum; i++) {
            const randomIndex = Math.floor(Math.random() * indices.length);
            const selectedIndex = indices.splice(randomIndex, 1)[0];
            hands.push(deck[selectedIndex]);
        }


        hands.forEach((h) => {
            counter[h]++;
        });


        const num_one = counter.filter((count) => count === 1).length;
        const num_two = counter.filter((count) => count === 2).length;
        const num_three = counter.filter((count) => count === 3).length;

        if (num_one * 1 + num_two * 2 + num_three * 3 === 5) {
            if (num_one === 5) {
                no_pair++;
            } else if (num_one === 3 && num_two === 1) {
                one_pair++;
            } else if (num_one === 1 && num_two === 2) {
                two_pair++;
            } else if (num_one === 2 && num_three === 1) {
                three_card++;
            } else if (num_two === 1 && num_three === 1) {
                full_house++;
            }
        }
    }

    const probs = [
        (no_pair * 100) / drawnum,
        (one_pair * 100) / drawnum,
        (two_pair * 100) / drawnum,
        (three_card * 100) / drawnum,
        (full_house * 100) / drawnum
    ];

    return probs;
}

