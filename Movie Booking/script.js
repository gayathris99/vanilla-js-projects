const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
const ticketPrice = +movieSelect.value

const updateCount = () => {
const selectedSeats = document.querySelectorAll('.row .seat.selected')
const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat))
localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
const seatCount = selectedSeats.length
count.innerText = seatCount
total.innerText = seatCount * movieSelect.value
}
const setMovieData = (movieIndex, moviePrice) => {
localStorage.setItem('selectedMovieIndex', movieIndex )
localStorage.setItem('selectedMoviePrice', moviePrice)
} 

const populateUI = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat,index) => {
        if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected')
        }
    })
}

const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex
}
}
movieSelect.addEventListener('change', (e) => { 
    total.innerText = count.innerText * movieSelect.value
    setMovieData(e.target.selectedIndex, e.target.value)
})

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        updateCount()
    }
})
populateUI()
updateCount()