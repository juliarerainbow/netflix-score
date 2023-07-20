class AppController {

    constructor(){
        this.shows = [];
        this.isVoting=false;
        // this.orderMethod=orderMethod;
    }

    init(){
        this.render()
        DBService.getAllShows().then(shows => { 
            this.shows = shows;
            this.renderShows();
          });
    }
    
    render(){
        const appContainer = document.getElementById('app');

        appContainer.innerHTML = `
        <header>
            <h1>Netflix Score</h1>
            <a href="./index.html">Lista</a>
            <a href="./new-show.html">Nuovo</a>
        </header>
        <main>
            <div id = "btn-container"></div>
            <ul id = "shows-container">

            </ul>
        </main>
        <footer>
            <p>All rights reserved</p>
        </footer>

        `;
    }   


    sortByDownvotes(){

        this.shows.sort((s1,s2) => s2.downVotes - s1.downVotes);
        this.renderShows();
    }

    sortByUpvotes(){
        this.shows.sort((s1,s2) => s2.upVotes - s1.upVotes);
        this.renderShows();
    }



    // orderMethod(){

    // }



    renderShows(){

        // if(this.orderMethod = 'upvote') {
        //     //sort 

        // }else if (this.orderMethod='downvote'){
        //     //sort
        // }

        const btnContainer = document.getElementById('btn-container');
        btnContainer.innerHTML="";

        const sortUpBtn = document.createElement('button');
        sortUpBtn.appendChild(document.createTextNode('ordina per upvotes'));
        sortUpBtn.addEventListener('click', () => this.sortByUpvotes());
        btnContainer.appendChild(sortUpBtn);

        const sortDownBtn = document.createElement('button');
        sortDownBtn.appendChild(document.createTextNode('ordina per downvotes'));
        sortDownBtn.addEventListener('click', () => this.sortByDownvotes());
        btnContainer.appendChild(sortDownBtn);



        const showsContainer = document.getElementById('shows-container');

        showsContainer.innerHTML="";

        for (let i = 0; i < this.shows.length; i++) {
            const show = this.shows[i];

            const listElement = document.createElement('li');
            const titleNode = document.createTextNode(show.title);
            listElement.appendChild(titleNode);


            const upvoteSpan = document.createElement('span');
            upvoteSpan.appendChild(document.createTextNode(show.upVotes));

            listElement.appendChild(upvoteSpan);

            const upBtn = document.createElement('button');
            upBtn.appendChild(document.createTextNode('👍'));

            upBtn.addEventListener('click', () => this.upvoteShow(show));

            listElement.appendChild(upBtn);



            const downvoteSpan = document.createElement('span');
            downvoteSpan.appendChild(document.createTextNode(show.downVotes));

            listElement.appendChild(downvoteSpan);

            const downBtn = document.createElement('button');
            downBtn.appendChild(document.createTextNode('👎'));
            downBtn.addEventListener('click', () => this.downvoteShow(show));

            listElement.appendChild(downBtn);






            showsContainer.appendChild(listElement);
            
        }
    }



    upvoteShow(show) {
        if (!this.isVoting) {
            this.isVoting = true;
            DBService.upvote(show).then(show => {
                this.renderShows();
                this.isVoting=false;
            })
        }

    }

    downvoteShow(show) {
        if (!this.isVoting) {
            this.isVoting = true;
            DBService.downvote(show).then(show => {
                this.renderShows();
                this.isVoting=false;
            })
        }
    }

}