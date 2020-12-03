export default class PeepViewController {
  async allPeeps() {
    try {
      const result = await fetch(
        "https://chitter-backend-api-v2.herokuapp.com/peeps"
      );
      const data = await result.json()
    } catch (e) {
      console.log(e)
      return null;
    }
  }
};
