var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status)
    setTimeout(() => {
      updateFunction(serve.call(this, "Happy Eating!", this.customer))
    }, 2000)
  }
}

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
}

function makeCake() {
  var updateCakeStatus = updateStatus.bind(this)
  mix.call(cake,updateCakeStatus)
}

function makePie() {
  var updatePieStatus = updateStatus.bind(this)
  mix.call(pie,updatePieStatus)
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  let that = this
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  setTimeout(function() {
    cool.call(that,updateFunction)
  }, 2000)
  updateFunction(status)
}

function mix(updateFunction) {
  let that = this
  var status = "Mixing " + this.ingredients.join(", ")
  setTimeout(function() {
    bake.call(that, updateFunction)
  }, 2000)
  updateFunction(status)
}

function cool(updateFunction) {
  pie.decorate = cake.decorate
  var status = "It has to cool! Hands off!"
  setTimeout(()=>{
    this.decorate(updateFunction)
  }, 2000)
  updateFunction(status)
}

function makeDessert(event) {
  let parentNode = this.parentElement
  if (event.target.innerText === "Make Cake"){
    makeCake.call(parentNode)
  }else if (event.target.innerText === "Make Pie"){
    makePie.call(parentNode)
  }
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
