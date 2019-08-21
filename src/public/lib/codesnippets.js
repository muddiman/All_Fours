

/**
 * FUNCTIONS
 * @param {*} params 
 * @param {*} params
 * @returns variable 
 */
function functionName(params, params) {
// 
    var variable = initialized;
    statements;
    return variable;
}


/**
 * CONDITIONALS
 */
if (condition) {
    statements;
} else if (condition == 2) {
    statements;
} else {
    more statements;
}

/**
 * CASE SWITCH
 */
switch (expression) {
    case 0:
        statements;
        break;
    case 1:
        statements;
        break;
    case 2:
        statements;
        break;
    case 3:
        statements;
        break;
    default:
        day = "Unknown";

/**
 * FOR LOOP
 */
var i;
for (i = 0; i < length; i++) {
    statements;
}

/**
 * FOR/IN LOOP (for objects)
 */
var object = {name: "value", name2: "value2", name3: "value3"};
var text = "";
var x;
for (x in object) {
    text += object[x];
}

/**
 * WHILE LOOP
 */
while (condition) {
    //code block to be executed;
}

do {
    //code block to be executed;
}
while (condition);

 /**
  * OBJECTS
  */
 var person = {
    property1 : "value1",
    property2 : "value2",
    property3 : 5566,
    method : function() {
        //statements;
        return this.property1 + " " + this.property2;
    }
};  

/**
 * ERROR HANDLING
 */
try {
    statements; // test case:
}
catch(err) {
    statements; // Block of code to handle errors;
} 
finally {
    statements; // Block of code to be executed regardless of the try / catch result
}

/**
 * UNIT TEST CODE
 * @param:
 * @returns:
 */
function unitTestForFunction() {
    statements; // Error handling code
}

/**
 *  ERROR
 */
window.onerror = function(message, source, lineNumber, colNumber,errorObject) {
    this.console.log("Error Details:");
    this.console.log(`Message: ${message}`);
    this.console.log(`Source: ${source}`);
    this.console.log(`Line Numbers: ${lineNumber}`);
    this.console.log(`Col Number: ${colNumber}`);
    this.console.log("Error Object: ", errorObject);
}


//  *************************************************************************************

/**
 *  Promise
 */

 let promiseFunction = new Promise(function (resolve, reject) {
     // statements
     let isFinished = true;

     if (isFinished) {
         resolve('finished');
     } else {
         reject('not finish');
     }
 });
 // calling the promse
 promiseFunction.then(function (fromResolve) {
     console.log('the program is ' + fromResovle);
 });

 let loadScript = new Promise(function (resolve, reject) {
     //
     resolve('Script is successfully loaded');
 });
 loadScript.then(checkScript(fromResolve)).catch(function (fromReject) {
     console.log(fromReject)
 });