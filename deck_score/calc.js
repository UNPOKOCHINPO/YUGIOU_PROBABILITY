function combi(n, k) {
    if (n === 0 && k === 0) {
        return 1;
    }
    if (n < 0 || k < 0) {
        return 0;
    }
    let ret = 1;
    for (let i = 0; i < k; i++) {
        ret = Math.floor(ret * (n - i) / (i + 1));
    }
    return ret;
}

function P(d, wi, j, n) {
    if (wi <= 0 || j < 0) {
        return 0;
    }
    return combi(wi, j) * combi(n - wi, d - j) / combi(n, d);
}

function base_s(d, wi, c, n) {
    let num = 0;
    let dom = 0;
    for (let j = 1; j <= wi; j++) {
        num += P(d, wi, j, n) * c[j - 1];
        dom += P(d, wi, j, n) * 10;
    }
    return num / dom;
}

function Si(c1, c2, wi, n, maxxc = true) {
    let ret = base_s(5, wi, c1, n) / 2;
    if (maxxc) {
        ret += base_s(5, wi, c2, n) / 2;
    } else {
        ret += base_s(6, wi, c2, n) / 2;
    }
    return ret;
}

function DeckScore(n, af_score_list, as_score_list, num, num2, no_need_f, no_need_s, shotage_f, shotage_s) {
    // Counting the number of cards for hand inducement
    let af_len = 0, as_len = 0;
    for (let num_factor of num) {
        af_len += num_factor;
    }
    for (let num_factor of num2) {
        as_len += num_factor;
    }

    let f = 0, s = 0;
    // Hand inducement score
    for (let i = 0; i < af_score_list.length; i++) {
        let [c1, c2] = af_score_list[i];
        let wi = num[i];
        for (let j = 1; j <= wi; j++) {
            f += Si(c1, c2, wi, n, true);
        }
    }
    for (let i = 0; i < as_score_list.length; i++) {
        let [c1, c2] = as_score_list[i];
        let wi = num2[i];
        for (let j = 1; j <= wi; j++) {
            s += Si(c1, c2, wi, n, false);
        }
    }

    // Probability of inducing or rolling too many or too few cards
    let af_ng_list_no_need = Array.from({ length: 5 - no_need_f + 1 }, (_, i) => i + no_need_f);
    let af_ng_list_shotage = Array.from({ length: shotage_f + 1 }, (_, i) => i);
    let as_ng_list_no_need = Array.from({ length: 6 - no_need_s + 1 }, (_, i) => i + no_need_s);
    let as_ng_list_shotage = Array.from({ length: shotage_s + 1 }, (_, i) => i);

    let af_ng_prob_no_need = af_ng_list_no_need.reduce((acc, j) => acc + P(5, af_len, j, n), 0);
    let af_ng_prob_shotage = af_ng_list_shotage.reduce((acc, j) => acc + P(5, af_len, j, n), 0);
    let as_ng_prob_no_need = as_ng_list_no_need.reduce((acc, j) => acc + P(6, as_len, j, n), 0);
    let as_ng_prob_shotage = as_ng_list_shotage.reduce((acc, j) => acc + P(6, as_len, j, n), 0);

    // Inducement power (penalty is given based on the probability of not drawing at all because inducing too few, and penalty is given based on the probability of drawing too much because there are too many inductions in the original deck)
    let S_sub = ((1 - af_ng_prob_shotage) * f + (1 - as_ng_prob_shotage) * s);
    let S_main = (n - af_len * af_ng_prob_no_need - as_len * as_ng_prob_no_need);
    let S = S_sub + S_main;


    return (S * 100 / n).toFixed(2);
}

function optimizeDeckScore(n, afScoreList, asScoreList, noNeedF, noNeedS, shotageF, shotageS) {

    let f = 0;
    let s = 0;
    let fList = [];
    let sList = [];

    for (let scoresId = 0; scoresId < afScoreList.length; scoresId++) {
        let [c1, c2] = afScoreList[scoresId];
        for (let wi = 1; wi <= 3; wi++) {
            fList.push([Si(c1, c2, wi, n, true), scoresId]);
        }
    }
    fList.sort((a, b) => b[0] - a[0]);

    for (let scoresId = 0; scoresId < asScoreList.length; scoresId++) {
        let [c1, c2] = asScoreList[scoresId];
        for (let wi = 1; wi <= 3; wi++) {
            sList.push([Si(c1, c2, wi, n, false), scoresId]);
        }
    }
    sList.sort((a, b) => b[0] - a[0]);

    let afNgListNoNeed = Array.from({ length: 6 - noNeedF + 1 }, (_, i) => noNeedF + i);
    let afNgListShotage = Array.from({ length: shotageF + 1 }, (_, i) => i);
    let asNgListNoNeed = Array.from({ length: 7 - noNeedS }, (_, i) => noNeedS + i);
    let asNgListShotage = Array.from({ length: shotageS + 1 }, (_, i) => i);


    let maxS = 0;
    let fIdList = [];
    let sIdList = [];
    for (let fId = -1; fId < fList.length; fId++) {
        for (let sId = -1; sId < sList.length; sId++) {
            let afNgProbNoNeed = afNgListNoNeed.reduce((acc, j) => acc + P(5, fId + 1, j, n), 0);
            let afNgProbShotage = afNgListShotage.reduce((acc, j) => acc + P(5, fId + 1, j, n), 0);
            let asNgProbNoNeed = asNgListNoNeed.reduce((acc, j) => acc + P(6, sId + 1, j, n), 0);
            let asNgProbShotage = asNgListShotage.reduce((acc, j) => acc + P(6, sId + 1, j, n), 0);

            f = fList.slice(0, fId + 1).reduce((acc, val) => acc + val[0], 0);
            s = sList.slice(0, sId + 1).reduce((acc, val) => acc + val[0], 0);

            let SSub = (1 - afNgProbShotage) * f + (1 - asNgProbShotage) * s;
            let SMain = n - (fId + 1) * afNgProbNoNeed - (sId + 1) * asNgProbNoNeed;
            let S = SSub + SMain;


            if (S > maxS) {
                maxS = S;
                fIdList = fList.slice(0, fId + 1).map(val => val[1]);
                sIdList = sList.slice(0, sId + 1).map(val => val[1]);

                console.log(`fid:${fId}, f:${f}, sid:${sId}, s:${s}, SMain:${SMain}, w1:${(afNgProbNoNeed)}`);
            }
        }
    }

    return [fIdList, sIdList, (maxS * 100 / n).toFixed(2)];
}


function transformScoreList(scores, nums, detailedSetting) {
    scoreList = []
    numList = []
    scores.forEach(score => {
        scoreList.push(score.value);
    });
    nums.forEach(num => {
        numList.push(num.value);
    });

    const ret = [];
    const decline = 0.5;
    if (detailedSetting) {
        for (let i = 0; i < scoreList.length / 2; i++) {
            const subArray1 = [];
            const subArray2 = [];
            for (let j = 0; j < numList[i]; j++) {
                subArray1.push(scoreList[2 * i] * Math.pow(decline, j));
                subArray2.push(scoreList[2 * i + 1] * Math.pow(decline, j));
            }
            if (numList[i] > 0) {
                ret.push([subArray1, subArray2]);
            }
        }
    } else {
        for (let i = 0; i < scoreList.length / 6; i++) {
            const subArray1 = [];
            const subArray2 = [];
            for (let j = 0; j < numList[i]; j++) {
                subArray1.push(scoreList[6 * i + j]);
                subArray2.push(scoreList[6 * i + j + 3]);
            }
            if (numList[i] > 0) {
                ret.push([subArray1, subArray2]);
            }
        }
    }
    return ret;
}

function transformNumList(nums) {
    numList = []
    nums.forEach(num => {
        numList.push(parseInt(num.value));
    });

    return numList;
}

function transformScoreListForOptimization(scores, detailedSetting) {
    scoreList = []
    scores.forEach(score => {
        scoreList.push(score.value);
    });

    const ret = [];
    const decline = 0.5;
    if (detailedSetting) {
        for (let i = 0; i < scoreList.length / 2; i++) {
            const subArray1 = [];
            const subArray2 = [];
            for (let j = 0; j < 3; j++) {
                subArray1.push(scoreList[2 * i] * Math.pow(decline, j));
                subArray2.push(scoreList[2 * i + 1] * Math.pow(decline, j));
            }
            if (subArray1.length > 0) {
                ret.push([subArray1, subArray2]);
            }
        }
    } else {
        for (let i = 0; i < scoreList.length / 6; i++) {
            const subArray1 = [];
            const subArray2 = [];
            for (let j = 0; j < 3; j++) {
                subArray1.push(scoreList[6 * i + j]);
                subArray2.push(scoreList[6 * i + j + 3]);
            }
            if (subArray1.length > 0) {
                ret.push([subArray1, subArray2]);
            }
        }
    }
    return ret;
}