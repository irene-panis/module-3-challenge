// Assignment code here
var lowercase = Array.from("abcdefghijklmnopqrstuvwxyz");
var uppercase = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
var numeric = Array.from("1234567890");
var special = Array.from(" !\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~");

// iterates over array to check if password contains any items from it
function verifyCriteria(password, condition, array) {
  if (condition) { // if criteria is chosen, run for-loop
    for (var i = 0; i < array.length; i++) {
      if (password.includes(array[i])) {
        return true; // returns true immediately if password satisfies criteria
      } 
    }
    return false; // returns false if password does not satisfy criteria
  }
  return; // returns undefined if criteria is not chosen
}

function generatePassword() {
  var listOfCharacters = []; // initialize empty array to be added to; this will be our list of characters to choose from

  while (listOfCharacters.length === 0) { // loop until at least one criterion is selected
    var containsLowercase = window.confirm("Would you like to include lowercase letters in your password?");
    var containsUppercase = window.confirm("Would you like to include uppercase letters in your password?");
    var containsNumeric = window.confirm("Would you like to include numbers in your password?");
    var containsSpecial = window.confirm("Would you like to include special characters in your password?");
  
  
    if (containsLowercase) { // if lowercase is selected, add lowercase characters to pool
      listOfCharacters = listOfCharacters.concat(lowercase);
    }
  
    if (containsUppercase) {
      listOfCharacters = listOfCharacters.concat(uppercase);
    }
  
    if (containsNumeric) {
      listOfCharacters = listOfCharacters.concat(numeric);
    }
  
    if (containsSpecial) {
      listOfCharacters = listOfCharacters.concat(special);
    }

    if (listOfCharacters.length === 0) { // if listOfCharacters is empty, no criteria were selected by user and user is alerted
      window.alert("Please choose at least one character type to include in your password.");
    }
  }

  do { // keeps asking for pass length until user inputs valid number
    var passLength;
    passLength = window.prompt("How many characters would you like your password to be? Please choose a number between 8 and 128.");

    if ((passLength < 8) || (passLength > 128)) {
      window.alert("Please choose a number between 8 and 128!");
    }
  } while ((passLength < 8) || (passLength > 128));

  do { // keep generating passwords until password satisfies criteria
    var password = ""; // initialize empty string to be added to
    var verified = false; // placeholder variable for later verification

    // PASSWORD GENERATION
    for (var i = 0; i < passLength; i++) {
      var index = Math.floor(Math.random() * listOfCharacters.length); // generate random index between 0 and listOfCharacters.length
      var randomChar = listOfCharacters[index];
      password = password.concat(randomChar); // add character corresponding to random index to password; build password until passLength is reached
    }

    if (verifyCriteria(password, containsLowercase, lowercase) === false) { // need to specify false because verifyCriteria can also return undefined
      continue; // if criteria not met skip rest of loop and start from beginning
    }
    if (verifyCriteria(password, containsUppercase, uppercase) === false) {
      continue;
    }
    if (verifyCriteria(password, containsNumeric, numeric) === false) {
      continue;
    }
    if (verifyCriteria(password, containsSpecial, special) === false) {
      continue;
    }
    
    verified = true; // set verified to true if loop completes uninterrupted
  } while (verified === false);

  return password;
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
