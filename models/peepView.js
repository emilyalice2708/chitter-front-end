export default class PeepView {
  makeHTML(list) {
    let allPeeps = ""
    list.map((peep) => {
      allPeeps += `<li>${peep.user.handle} posted:<br> ${peep.body} <br>`
      allPeeps += ` Likes: ${peep.likes.length} `
      allPeeps += `<a id="${peep.id}" href="#peeps/${peep.id}">View Peep</a></li>`
    })

    this.appendList(allPeeps)
  }

  singlePeepHTML(peep) {
    const peepsDiv = document.getElementById("peeps")
    peepsDiv.innerHTML = `<li>${peep.user.handle} posted:<br> ${peep.body} <br> Likes: ${peep.likes.length} </li>`
  }

  appendList(allPeeps) {
    const peepsDiv = document.getElementById('peeps')
    peepsDiv.setAttribute("id", "peeps")
    peepsDiv.innerHTML = allPeeps
  }
}
