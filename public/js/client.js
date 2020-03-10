console.log('client side javascript...')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ""
messageTwo.textContent = ""

weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault()
    console.log(search.value)

    const url = 'http://localhost:3000/weather?address='+search.value
    console.log(url)
    fetch(url).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = "Loading..."
            messageTwo.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})


})
