startCroutMethod = (A, B) => {
  // matrix A
  let matrixA = A;
  let matrixB = B;

  // Generate L and U using matrix A length
  let matrixL = Array(matrixA.length)
    .fill()
    .map(() => Array(matrixA.length).fill(0));
  let matrixU = Array(matrixA.length)
    .fill()
    .map(() => Array(matrixA.length).fill(0));
  let Y = Array(matrixA.length).fill(0);
  let X = Array(matrixA.length).fill(0);
  // .map(() => Array(3));

  crout = () => {
    // assign matrix A length to a variable
    let n = matrixA.length;

    // loop in to index
    for (i = 0; i < n; i++) {
      // solve for L
      for (j = 0; j < n; j++) {
        // if j is less than i change value of matrixL to 0 with its corresponding indexes
        if (j < i) matrixL[j][i] = 0;
        else {
          // the first column of matrix L is equal to the first column of matrix A
          matrixL[j][i] = matrixA[j][i];

          //  loop the values excluding the first column and top row
          for (k = 0; k < i; k++) {
            matrixL[j][i] = matrixL[j][i] - matrixL[j][k] * matrixU[k][i];
          }
        }
      }
      // loop in to index to solve for U
      for (j = 0; j < n; j++) {
        // if j is less than i change value of martixU to 0 with its corresponding indexes
        if (j < i) matrixU[i][j] = 0;
        // if j is equal to i the change value to 1
        //  result to a diagonal values of 1
        else if (j == i) matrixU[i][j] = 1;
        else {
          // get index of the first rows of matrixU
          matrixU[i][j] = matrixA[i][j] / matrixL[i][i];

          // loop to get values excluding the first rows, 1's and 0's
          for (k = 0; k < i; k++) {
            matrixU[i][j] =
              matrixU[i][j] - (matrixL[i][k] * matrixU[k][j]) / matrixL[i][i];
          }
        }
      }
    }

    //forward subtitution method
    // let Ly = B
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j <= i; j++) {
        // substitue values
        sum += matrixL[i][j] * Y[j];
      }

      // solve for Y
      // store answer to array
      Y[i] = (matrixB[i] - sum) / matrixL[i][i];

      // round to 2 decimal place
      // NOTE: floating points in javascript have accuracy problems when rounding off
      Y[i] = Math.round((Y[i] + Number.EPSILON) * 100) / 100;
    }

    // let Ux = y
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;

      for (let p = n - 1; p >= i; p--) {
        // substitue values
        sum += matrixU[i][p] * X[p];
      }

      // solve for X
      // store answer to array
      X[i] = (Y[i] - sum) / matrixU[i][i];

      // round to 2 decimal place
      X[i] = Math.round((X[i] + Number.EPSILON) * 100) / 100;
    }

    //  print in console
    console.log(
      "matrixA:\n",
      matrixA,
      "\n\nmatrixL:\n",
      matrixL,
      "\n\nmatrixU:\n",
      matrixU,
      "\n\nmatrixB:\n",
      matrixB,
      "\n\n-------- Using Forward Substitution ----------",
      "\n\nY:\n",
      Y,
      "\n\n-------- Using Backward Substitution ----------", 
      "\n\nX:\n",
      X
    );
  };
  crout();
};

/**
 *
 * startCroutMethod(matrix A, matrix B)
 * startCroutMethod takes 2 parameters
 * first parameters is matrix A
 * and the second parameter is matrix B
 *
 * sample:
 * startCroutMethod([
 * [5, 4, 1],
 * [10, 9, 4],
 * [10, 13, 15],
 * ],
 * [3.4, 8.8, 19.2]
 * );
 *
 *
 * to run in node cli
 * node -e "require('./index').init(matrixA,matrixB)"
 *
 * sample:
 * node -e "require('./index').init([[5,4,1],[10,9,4],[10,13,15]],[3.4,8.8,19.2])"
 *
 *
 */

module.exports.init = function (a, b) {
  startCroutMethod(a, b);
};
