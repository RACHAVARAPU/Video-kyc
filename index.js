let users = localStorage.getItem("users") || [{}]
users = typeof(users) === "string" ? JSON.parse(users) : users;

const signupForm = document.getElementById('signupForm')

signupForm?.addEventListener('submit', (event) =>{
    event.preventDefault();
    console.log('hi bro')
    const userData = new FormData(event.target)
    users.push({
        username: userData.get('username'),
        email: userData.get("email"),
        password: userData.get('password')
    })
    
    window.alert('Registered successfully!')
    localStorage.setItem('users', JSON.stringify(users))
    console.log(users)

})


const loginForm = document.getElementById('loginForm')

loginForm?.addEventListener('submit', (event) => {
    const loginData = new FormData(event.target)

    event.preventDefault()
     const userExists = users.find(user => {
        console.log(user, loginData.get('username'), loginData.get('password'))
        if(user.username === loginData.get('username') && user.password === loginData.get('password')){
            return true
        }else{
            return false
            
        }
    })
    
    if(userExists){
        window.location.href = "/Dashboard.html";

    }else{
        window.alert('Invalid credentials')
    }
})