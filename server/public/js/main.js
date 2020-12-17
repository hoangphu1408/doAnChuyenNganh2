
const test = function(){
    const username = document.querySelector("#username").value
    const password = document.querySelector("#password").value

    axios({
        method: "POST",
        url: "http://localhost:5000/admin/test1?username="+username+"&password="+password,
    }).then(res=>{
        console.log(res.data);
    }).catch(err => {
        console.log(err);
    })
}

const test1 = function(){
    let username = document.querySelector("#username").value;
    if(username === "abc"){
        let test = `<div class="loader"></div>`;
           document.querySelector(".login__content").innerHTML = test;
           setTimeout(() => {
                let lgContent = `
                <img class="login__avatar" src="../public/img/b.png" alt="" />
                <p class="login__userName">User name</p>
                <form action="#">
                <div class="login__form">           
                    <input
                    id="password"
                    class="login__input mb-3"
                    type="password"
                    placeholder="Enter your password"
                    />          
                  <button class="login__btn" onclick="test()">Login</button>
                </div>
                </form>
                `;
                document.querySelector(".login__content").innerHTML = lgContent;
           }, 3000);
    }else{
        let lgContent = `
         <div class="login__form">
            <p class="text-danger">Email not exist!</p>
            <input
            id="username"
            class="login__input mb-1"
            type="text"
            placeholder="Enter your email"
            />        
            <button class="login__btn" onclick="test1()">Next</button>
         </div>
        `;
        document.querySelector(".login__content").innerHTML = lgContent;
    }
}

const z = new text();
console.log(z.loginSuccess());