

// DBService.getAllShows().then(shows => console.log(shows))

// const show1 = {
//     "title": "rick and morty",
//     "author": "justin roiland",
//     "imageUrl": "https://fumettologica.it/wp-content/uploads/2023/01/rick-and-morty-670x377.jpg",
//     "isOver": false,
//     "upVotes": 2,
//     "downVotes": 0,
//     "id": "1"
// }

// DBService.upvote(show1).then(show => console.log(show));


const app = new AppController();

app.init();



const showButton = document.getElementById("showDialog");
const newShowDialog = document.getElementById("newShowDialog");
const confirmBtn = newShowDialog.querySelector("#confirmBtn");

const cancelBtn = newShowDialog.querySelector("#cangelBtn");

showButton.addEventListener("click", () => {
    newShowDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    event.preventDefault();
    newShowDialog.close(); 
});


function sendData(event) {
    event.preventDefault();
    const form = document.forms['create'];
    // const title = form['title'].value;
    const formData = new FormData(form);

    const newShow = {
        title: formData.get('title'),
        author: formData.get('author'),
        imageUrl: formData.get('imageUrl'),
        isOver: formData.get('isOver') === 'on' ? true : false,
        upVotes: 0,
        downVotes: 0
    }

    DBService.createShow(newShow).then(show => window.location='./index.html').catch(error=>alert(error.message));
}



