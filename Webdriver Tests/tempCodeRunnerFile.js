function finishAssignment(content) {
  console.log("Starting the assignment...");
  setTimeout(function () {
    console.log("Assignment finished: " + content);
  }, 2000);
  console.log("Now what?");
}

finishAssignment("Here is my report");
