'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */

function createCompassPoints() {
    var sides = ['N', 'E', 'S', 'W']; // use array of cardinal directions only!
    var result = [];
    //N E S W
    for (let i = 0, j = 0; i < 360, j < sides.length; i += 90, j++) {
        result.push({ abbreviation: sides[j], azimuth: i });
    }
    //NE SE SW NW
    for (let i = 45, j = 0; i < 360; i += 90, j++) {
        if (j % 2 === 0) result.push({ abbreviation: sides[j] + sides[j + 1], azimuth: i });else if (j + 1 === sides.length) result.push({ abbreviation: sides[0] + sides[j], azimuth: i });else result.push({ abbreviation: sides[j + 1] + sides[j], azimuth: i });
    }
    //NbE EbS SbW WbN
    for (let i = 11.25, j = 0; i < 360; i += 90, j++) {
        if (j + 1 === sides.length) result.push({ abbreviation: `${ sides[j] }b${ sides[0] }`, azimuth: i });else result.push({ abbreviation: `${ sides[j] }b${ sides[j + 1] }`, azimuth: i });
    }
    //NEbE SEbS SWbW NWbN
    for (let i = 56.25, j = 0; i < 360; i += 90, j++) {
        if (j % 2 === 0) result.push({ abbreviation: sides[j] + sides[j + 1] + 'b' + sides[j + 1], azimuth: i });else if (j + 1 === sides.length) result.push({ abbreviation: sides[0] + sides[j] + 'b' + sides[0], azimuth: i });else result.push({ abbreviation: sides[j + 1] + sides[j] + 'b' + sides[j + 1], azimuth: i });
    }
    //NNE ENE ESE SSE SSW WSW WNW NNW
    for (let i = 22.5, j = 0; j < sides.length; i += 45, j++) {
        if (j % 2 === 0) {
            result.push({ abbreviation: sides[j] + sides[j] + sides[j + 1], azimuth: i });
            result.push({ abbreviation: sides[j + 1] + sides[j] + sides[j + 1], azimuth: i += 45 });
        } else if (j + 1 === sides.length) {
            result.push({ abbreviation: sides[j] + sides[0] + sides[j], azimuth: i });
            result.push({ abbreviation: sides[0] + sides[0] + sides[j], azimuth: i += 45 });
        } else {
            result.push({ abbreviation: sides[j] + sides[j + 1] + sides[j], azimuth: i });
            result.push({ abbreviation: sides[j + 1] + sides[j + 1] + sides[j], azimuth: i += 45 });
        }
    }
    //NEbN SEbE SWbS NWbW
    for (let i = 33.75, j = 0; j < sides.length; i += 90, j++) {
        if (j % 2 === 0) result.push({ abbreviation: sides[j] + sides[j + 1] + 'b' + sides[j], azimuth: i });else if (j + 1 === sides.length) result.push({ abbreviation: sides[0] + sides[j] + 'b' + sides[j], azimuth: i });else result.push({ abbreviation: sides[j + 1] + sides[j] + 'b' + sides[j], azimuth: i });
    }
    //EbN SbE WbS NbW
    for (let i = 78.75, j = 0; j < sides.length; i += 90, j++) {
        if (j + 1 === sides.length) result.push({ abbreviation: sides[0] + 'b' + sides[j], azimuth: i });else result.push({ abbreviation: sides[j + 1] + 'b' + sides[j], azimuth: i });
    }
    return result.sort((a, b) => a.azimuth - b.azimuth);
}

/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
    throw new Error('Not implemented');
}

/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
    var arr = Array.from({ length: n }, (element, index) => {
        element = new Array(n).fill(0);
        element[index] = 0;
        return element;
    });
    var i = 0;
    var j = 0;

    for (let k = 0; k < n * n; k++) {
        arr[i][j] = k;
        if ((i + j) % 2 === 0) {
            if (j < n - 1) j++;else i += 2;
            if (i > 0) i--;
        } else {
            if (i < n - 1) i++;else j += 2;
            if (j > 0) j--;
        }
    }
    return arr;
}

/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    var result = dominoes.map(element => {
        return element[0] + element[1];
    }).reduce((pValue, cValue) => pValue + cValue);
    return result % 2 !== 0;
}

/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    var result = '';
    for (var i = 0; i < nums.length - 1; i++) {
        var j = i;

        while (nums[j] === nums[j + 1] - 1) j++;

        if (nums[i] + 1 !== nums[i + 1] && i !== nums.length - 2) result += `${ nums[i] },`;else if (nums[i] + 1 === nums[i + 1] && nums[i] + 2 !== nums[i + 2]) result += `${ nums[i] },${ nums[i + 1] },`;else result += `${ nums[i] }-${ nums[j] },`;
        i = j;
    }
    return result.slice(0, -1);
}

module.exports = {
    createCompassPoints: createCompassPoints,
    expandBraces: expandBraces,
    getZigZagMatrix: getZigZagMatrix,
    canDominoesMakeRow: canDominoesMakeRow,
    extractRanges: extractRanges
};

//# sourceMappingURL=10-katas-1-tasks-compiled.js.map