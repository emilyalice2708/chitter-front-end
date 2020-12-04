export default class PeepView {
  makeHTML(list) {
    let allPeeps = ""
    list.map((peep) => {
      allPeeps += `<li>${peep.user.handle} posted:<br> ${peep.body} <br>`
      allPeeps += ` Likes: ${peep.likes.length} `
      allPeeps += ` Posted on ${this.formatDate(peep)}, at ${this.formatTime(peep)}`
      allPeeps += `<a id="${peep.id}" href="#peeps/${peep.id}">View Peep</a></li>`
    })

    this.appendList(allPeeps)
  }

  formatDate(peep) {
    const date = peep.created_at.split('T')[0]
    return date.split('-').reverse().join('/')
  }

  formatTime(peep) {
    const date = peep.created_at.split('T')[1].split('.')[0].split(':')
    return `${date[0]}:${date[1]}`
  }

  singlePeepHTML(peep) {
    console.log(peep)
    const peepsDiv = document.getElementById("peeps")
    peepsDiv.innerHTML = `<li>${peep.user.handle} posted:<br> ${peep.body} <br> Likes: ${peep.likes.length} </li>`
  }

  appendList(allPeeps) {
    const peepsDiv = document.getElementById('peeps')
    peepsDiv.setAttribute("id", "peeps")
    peepsDiv.innerHTML = allPeeps
  }
}