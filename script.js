function clearContainer(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
    
 }

async function getAlbum() {
    const searchInput = document.querySelector('#search-input');
    const searchValue = searchInput.value;

   
    const localJSON = './album-data.json';

    let albumData = null;
    try {
        
        const response = await fetch(localJSON)
        const data = await response.json();
        console.log(data)
        
        albumData = data;
    }
    catch{
        console.log('error', error);
        alert('album not found')
    }
    
    

    albumStats(albumData, searchValue);
    console.log(albumData)
    
   

}



function albumStats(albumData, searchValue){
    
    const albumName = document.querySelector('#album');
    const artist = document.querySelector('#artist');
    const albumCover = document.querySelector('#sprite');
    const albumGenre = document.querySelector('#genre');

    let albumFound = false;
    let desAlbum = null;

    if(searchValue >= 0 && searchValue < albumData.albums.length){
        albumFound = true;

        albumName.textContent = albumData.albums[searchValue].albumName;

        artist.textContent = `Artist: ${albumData.albums[searchValue].artist}`

        albumCover.src = albumData.albums[searchValue].albumCover

        
        albumGenre.textContent = albumData.albums[searchValue].stats.genre
        
        console.log(albumFound)
        let album = albumData.albums[searchValue];
        console.log(album)
        setTracklist(albumData.albums[searchValue].stats.trackList)

    }
    else{
        for (const album of albumData.albums) {
            console.log("looking")
            if(album.albumName === searchValue){
                albumName.textContent = searchValue;
                albumFound = true;
                desAlbum = album;

                artist.textContent = `Artist: ${album.artist}`

                albumCover.src = album.albumCover

                
                albumGenre.textContent = album.stats.genre

                break;
               
            }
            setTracklist(album.stats.trackList)
            
        } 
        console.log(albumFound)   
    }

    if (albumFound == false) {
        alert('album not found')
    }
}



/**
 * 
 * @param {Array} tracklist - array for tracklist for albums
 */
function setTracklist(tracklist){
    console.log(tracklist)
    const songsContainer = document.querySelector('#songs');
    console.log(songsContainer);
    clearContainer(songsContainer);

    for (const [key, value] of Object.entries(tracklist)) {
        console.log(`${key}: ${value}`);
        const addSong = document.createElement('div')
        addSong.textContent = value
        addSong.classList.add("song")
        addSong.classList.add("row")
        songsContainer.appendChild(addSong)
      }

 
}

function runProgram() {
    const searchButton = document.querySelector('#search-button');
    searchButton.addEventListener('click', getAlbum);
    
}

document.addEventListener('DOMContentLoaded', runProgram);