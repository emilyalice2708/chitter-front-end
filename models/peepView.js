export default class PeepView {
  makeHTML(list) {
    let allPeeps = ""
    list.map(function(peep){
      allPeeps += `<li>${peep.user.handle} posted:<br> ${peep.body} <br><a id="${peep.id}" href="#peeps/${peep.id}">View Peep</a></li>`
    })
    var peepsDiv = document.getElementById('peeps')
    peepsDiv.setAttribute("id", "peeps")
    peepsDiv.innerHTML = allPeeps
  }

  singlePeepHTML(peep) {
    var peepsDiv = document.getElementById("peeps")
    peepsDiv.innerHTML = `<li>${peep.user.handle} posted:<br> ${peep.body} <br></li>`
  }
}
