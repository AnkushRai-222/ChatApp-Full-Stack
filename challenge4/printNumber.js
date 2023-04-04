
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}


/* Explanation
We are Using "let" instead of "var".
When using "let", a new binding for "i" is created for each iteration of the loop. 
This means that each setTimeout function will reference a different "i" variable, 
and not the same variable as in the previous iterations. As a result,
we get the output 
*/

