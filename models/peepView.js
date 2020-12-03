export default class PeepView {
  makeHTML(list) {
    let allPeeps = ""
    list.map(function(peep){
      allPeeps += `<li>${peep.user.handle} posted:<br> ${peep.body} <br></li>`
    })
    var peepsDiv = document.getElementById('peeps')
    peepsDiv.setAttribute("id", "peeps")
    peepsDiv.innerHTML = allPeeps
  }

  singlePeepHTML(peep) {
    var peepsDiv = document.getElementById("peeps")
    peepsDiv.innerHTML = peep.body
  }
}