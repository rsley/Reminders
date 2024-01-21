const app = require("express
                    
function getFormattedDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}

app.get("/new/:id", (rq, rs) => {
  const reminderId = rq.params.id
  const userId = rq.headers.user
  const price = rq.headers.price
  const date = getFormattedDate()

  
})

app.listen(4000, () => {
  console.log("ready...")
})
