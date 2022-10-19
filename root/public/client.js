const socket = io();

const addProductForm = document.getElementById("addProductForm");
const msgForm = document.getElementById("msg-form")
let divVista = document.getElementById("vista")
let divMsg = document.getElementById("msg-center")

let titleInput = document.getElementById("title")
let priceInput = document.getElementById("price")
let imageInput = document.getElementById("image")

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value
    const price = priceInput.value
    const image = imageInput.value
    let object = {title, price, image}
    socket.emit("productAdded", object)
    titleInput.value = ""
    priceInput.value = ""
    imageInput.value = ""
  });

  
socket.on('products', (result) =>{
    fetch("http://localhost:8080/vista.hbs")
    .then((data)=> data.text())
    .then((data)=> {
       let html = Handlebars.compile(data);
       
       divVista.innerHTML = html({products: result})
    })
    
})

socket.on('messages', (data) =>{
  const html = data.map((message)=>{
    return `
      <span style="color: brown;">
        <strong style="color: blue;">${message.email} </strong>${message.date} <i style="color: green;">${message.text} </i>
      </span><br>
    `
  }).join("\n");
  
  divMsg.innerHTML = html
})

const textInput = document.getElementById("text-input")
const emailInput = document.getElementById("email-input")

msgForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = textInput.value
  const email = emailInput.value
  let object = {email, text}
  socket.emit("send-msg", object)
  textInput.value = ""
});