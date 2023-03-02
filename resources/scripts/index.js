let app = document.getElementById("app")
let taskCount = 0
let Songs = JSON.parse(localStorage.getItem('mySongs')) ? JSON.parse(localStorage.getItem('mySongs')) : []


function handleOnLoad()
{
    createTable()
    createForm()
    console.log(Songs)
}

function createForm()
{
    let form = document.createElement('form')
    let songTitle = document.createElement('input')
    songTitle.type = 'text'
    songTitle.placeholder = 'Please enter a song title'
    songTitle.id = 'newTitle'
    form.appendChild(songTitle)


    let songArtist = document.createElement('input')
    songArtist.type = 'text'
    songArtist.placeholder = 'Please enter the artist'
    songArtist.id = 'newArtist'
    form.appendChild(songArtist)

    let submitButton = document.createElement('button')
    submitButton.setAttribute("class", "unfavorite")
    submitButton.textContent = 'Submit'
    form.appendChild(submitButton)

    form.addEventListener('submit', function(e)
    {
        e.preventDefault()
        let currentDate = new Date().toJSON().slice(0, 10)
        let songs = {
            title: e.target.elements.newTitle.value,
            artist: e.target.elements.newArtist.value,
            date: currentDate,
            favorite: Boolean(false),
            delete: Boolean(false)
        }
        addRow(songs)
        e.target.elements.newTitle.value = ''
        e.target.elements.newArtist.value = ''
    })


    app.appendChild(form)


}

function addRow(songs)
{
    let tableBody = document.getElementById('songsTableBody')
    let tr = document.createElement('TR')
    tableBody.appendChild(tr)

    let id = Math.floor(Math.random() * 100000)

    let td1 = document.createElement('TD')
    td1.width = 500
    td1.appendChild(document.createTextNode(`${songs.title}`))
    tr.appendChild(td1)

    let td2 = document.createElement('TD')
    td2.width = 300
    td2.appendChild(document.createTextNode(`${songs.artist}`))
    tr.appendChild(td2)

    let td3 = document.createElement('TD')
    td3.width = 200
    td3.appendChild(document.createTextNode(`${songs.date}`))
    tr.appendChild(td3)

    let td4 = document.createElement('TD')
    td4.width = 200
    td4.appendChild(document.createTextNode(`${songs.favorite}`))
    tr.appendChild(td4)

    songs.id = id

    Songs.unshift(songs)

    localStorage.setItem('mySongs', JSON.stringify(Songs))
}
 bn
function createTable()
{
    //create table
    let table = document.createElement('TABLE')
    table.border = '1'
    table.id = 'songsTable'
    let tableBody = document.createElement('TBODY')
    tableBody.id = 'songsTableBody'
    table.appendChild(tableBody)

    //create header row
    let tr = document.createElement('TR')
    tableBody.appendChild(tr)

    let th1 = document.createElement('TH')
    th1.width = 500
    th1.appendChild(document.createTextNode('Title'))
    tr.appendChild(th1)

    let th2 = document.createElement('TH')
    th2.width = 300
    th2.appendChild(document.createTextNode('Artist'))
    tr.appendChild(th2)

    let th3 = document.createElement('TH')
    th3.width = 200
    th3.appendChild(document.createTextNode('Date'))
    tr.appendChild(th3)

    let th4 = document.createElement('TH')
    th4.width = 200
    th4.appendChild(document.createTextNode('Favorited'))
    tr.appendChild(th4)

    //add data row
    Songs.forEach((songs)=>
    {
        if(songs.delete == false)
        {
        let tr = document.createElement('TR')
        tableBody.appendChild(tr)

        let td1 = document.createElement('TD')
        td1.width = 500
        td1.appendChild(document.createTextNode(`${songs.title}`))
        tr.appendChild(td1)

        let td2 = document.createElement('TD')
        td2.width = 200
        td2.appendChild(document.createTextNode(`${songs.artist}`))
        tr.appendChild(td2)
        
        let td3 = document.createElement('TD')
        td3.width = 200
        td3.appendChild(document.createTextNode(`${songs.date}`))
        tr.appendChild(td3)


        let td4 = document.createElement("button");
        td4.setAttribute("id", songs.id);
        td4.setAttribute("class", songs.favorite ? "unfavorite" : "favorite");
        td4.width = 200;
        td4.textContent = songs.favorite ? "Unfavorite" : "Favorite";
        td4.addEventListener("click", favoriteSong);
        tr.appendChild(td4);

        let td5 = document.createElement('button')
        td5.setAttribute("id", songs.id)
        td5.width = 200
        td5.textContent = "Delete"
        td5.addEventListener('click', deleteSong)
        tr.appendChild(td5)
        
        }
        


    })

    app.appendChild(table)

    

}


function favoriteSong(event) {
    let song = Songs.find((song) => song.id == event.target.id);
    song.favorite = !song.favorite;
    localStorage.setItem("mySongs", JSON.stringify(Songs));
    let favoriteButton = event.target;
    if (song.favorite) {
      favoriteButton.textContent = "Unfavorite";
      favoriteButton.classList.replace("favorite", "unfavorite");
    } else {
      favoriteButton.textContent = "Favorite";
      favoriteButton.classList.replace("unfavorite", "favorite");
    }
  }

function deleteSong(event)
{
    console.log(event.target.id)
    let song = Songs.find(song => song.id == event.target.id)
    song.delete = true
    localStorage.setItem('mySongs', JSON.stringify(Songs))

    console.log(song.delete)
    td5=event.target.parentElement
    td5.remove()
    
}