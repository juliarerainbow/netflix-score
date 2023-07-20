

function sendData(event) {
    // console.log(event);
    //per evitare che la form faccia la submit
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

