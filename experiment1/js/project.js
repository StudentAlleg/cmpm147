// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  const fillers = {
    greeting: ["Hello", "Greetings", "Hi", "Welcome"],
    adj: ["great", "good", "tasty", "yummy", "delicious", "scrumptious"],
    ingredient: ["blueberry", "chocolate", "peach", "cherry", "apricot"],
    pastry: ["muffin", "scone", "bar"],
    attempt: ["try", "shot", "attempt", "go"]
  };
  
  const template = `$greeting baker, in need of a $adj idea?
  
  How about making a $adj pastry? A $adj $ingredient $pastry sounds good to me, give it a $attempt!
  
  Good luck!
  `;
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    $("#box").text(story);
  }
  
  /* global clicker */
  $("#clicker").click(generate);
  
  generate();
  
}

// let's get this party started - uncomment me
//main();