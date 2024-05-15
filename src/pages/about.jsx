export const About = () => {
    return (
        <div className="about-center">
            <div className="about-center-disp">
                <h2>Total football</h2>
                <img src="./football_3.png" alt="img" />
                <p>
                    I am peter precious, 
                    i have been working on the total football project for a while.
                    the project will give football news and updates. livescores update is 
                    a feature that we are currently working on.<br/>
                    The total football website was sorely built by the programmer. This project
                    was created for those sports lovers out there to access football news and livescores update
                    (once we are done with integrating livescores into the website).<br/>My main focus is to ensure that people get football updates anytime anywhere.
                    I am some one who loves football and i am also a chelsea fan.<br/>I have been following football since
                    2006, I can still remember the night of 5<sup>th</sup> may, 2009 when chelsea was eliminated from the UEFA champions league due to some poor officiating from Tom Ovrebo.<br/>
                    The next day, I had to go to the news paper stand to get the news paper to check if the match would
                    be replayed due to the poor officiating. It was hard getting the news paper. To cut the long story short, I decided to build something to enable football lovers access football news without having to queue at a news paper stand.
                </p>
                <img src="./football_4.webp" alt="image" className="img-1"/>
                <p>
                    Football is my passion. Trust me, I even tried playing football but i didn't make it to pro.
                </p>
                <img src="./archi.png" alt="architecture" className="archi"/>
                <p>
                    The website was built with react, axios, react-router-dom etc. for the fronted. i wanted a framework that will integrate properly with nodejs and express (which was used for the backend). alongside node and express, mongodb was used for the database and mongoose was used for quering and performing related tasks at the backend.<br/>
                    Some of the features i have completd in my website are;<br/>
                </p>
                <ul>
                    <li>Admin login</li>
                    <li>Users can access the website on desktop, mobile phone and tablet</li>
                    <li>News are not hardcoded but created by a logged in admin</li>
                    <li>admin can delete and modify news</li>
                </ul>
                <p>
                    I used multer to manage sending of files from the frontend to my server. I discovered that after deleting a post from the frontend via a delete request from my server, the image connected to the post in a folder stored in the backend/server will not be deleted.<br/>
                    I managed it by creating a function that will delete the file if the post containing the file no longer exists.<br/>
                    My application deals with posting a football news alongside an image. I discovered that posting multiple image in a post, tends to store the images in an array and I'll need “req.files” instead of “req.file” to access the images and I'll also use req.files.length to check if the image array contains any image. Initially, I was using only req.file.
                </p>
                <p>
                    I can manage file properly after deleting it from the database. it is quite easier than it sounds.
                </p>
                <p>
                    below links are to;<br/>
                </p>
                <ul className="git-link">
                    <li><a href="https://totalfootball.vercel.app">totalfootball</a></li>
                    <li><a href="https://totalfootball.vercel.app">landing page</a></li>
                    <li><a href="https://github.com/petepresh007/backend-football.git">project</a></li>
                    <li><a href="https://www.linkedin.com/in/precious-peter-58258b190">linkedin</a></li>
                </ul>
            </div>
        </div>
    )
}