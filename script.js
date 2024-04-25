// getting all the html elements 
const userinput = document.getElementById("username");
const getDetailsbutton = document.getElementById("getDetails");
const profile = document.getElementById("profile");
const repo = document.getElementById("repo");

// getting username from input and using async function to fetch the details from github 
getDetailsbutton.addEventListener("click",async ()=>{
     const userName = userinput.value;
     // console.log(userName);
     // using the github api to fetch the  profile details from the server
     // since we are going to fetch from api we are changing to async function and will be using await keyword to handle
     const res = await fetch (`https://api.github.com/users/${userName}`) ;
     // since it will be in readble stream we are using . json
     const data = await res.json();
     //  console.log(data);
     getProfile(data)
    //  function call for repository 
     getRepo(userName)
})


// displaying the profile details after getting the username 
function getProfile(data){
    // console.log(data);
    // dispalying the profile details in the card
    profile.innerHTML = `
    <div class ="card">
    <div class ="card-img">
    <img src=${data.avatar_url} alt=${data.name}
    </div>
    <div class ="card-body">
    <div class ="card-title">${data.name}</div>
    <div class ="card-subHeading">${data.login}</div>
    <div class ="card-text">
    <p>${data.bio}</p>
    <p><i class="fa-solid fa-user-group"></i>  ${data.followers} followers.${data.following} following </p>
    <p><i class="fa-solid fa-location-dot"></i>  ${data.location}</p>
    <button>
    <a href =${data.html_url} target="_blank">visit profile </a>
    </button>
    </div>
    </div>
    </div>
    `;
}

//getting the username and posting to another api to get repository details 

async function getRepo(userName){
    // console.log(userName);
    const result = await fetch (`https://api.github.com/users/${userName}/repos`);
    // console.log(result);
    const repository= await result.json();
    console.log(repository);
    for (let i=0;i<repository.length;i++){
        repo.innerHTML += `
        <div class="card">
        <div class="card-body">
        <div class="card-title">${repository[i].name}</div>
        <div class="card-subHeading">${repository[i].language}</div>
        <div class ="card-text">
        <button>
        <a href=${repository[i].html_url} target="_blank">visit repo </a>
        </button>
        </div>
        </div>
        </div>
         `;
    }
 
}

