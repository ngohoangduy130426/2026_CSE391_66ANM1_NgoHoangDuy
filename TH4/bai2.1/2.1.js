

const form = document.getElementById("registerForm")

const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const password = document.getElementById("password")
const confirm = document.getElementById("confirm")
const terms = document.getElementById("terms")

const successBox = document.getElementById("success")

const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^0[0-9]{9}$/
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/


function showError(id,message){

const input=document.getElementById(id)
const error=document.getElementById(id+"-error")

error.textContent=message

input.classList.add("error-border")
input.classList.remove("success-border")

}

function clearError(id){

const input=document.getElementById(id)
const error=document.getElementById(id+"-error")

error.textContent=""

input.classList.remove("error-border")
input.classList.add("success-border")

}


function validateFullname(){

let value=fullname.value.trim()

if(value===""){
showError("fullname","Không được để trống")
return false
}

if(value.length<3){
showError("fullname","Ít nhất 3 ký tự")
return false
}

if(!nameRegex.test(value)){
showError("fullname","Chỉ được chứa chữ")
return false
}

clearError("fullname")
return true

}


function validateEmail(){

let value=email.value.trim()

if(value===""){
showError("email","Không được để trống")
return false
}

if(!emailRegex.test(value)){
showError("email","Email không hợp lệ")
return false
}

clearError("email")
return true

}


function validatePhone(){

let value=phone.value.trim()

if(value===""){
showError("phone","Không được để trống")
return false
}

if(!phoneRegex.test(value)){
showError("phone","SĐT phải 10 số và bắt đầu bằng 0")
return false
}

clearError("phone")
return true

}


function validatePassword(){

let value=password.value

if(value===""){
showError("password","Không được để trống")
return false
}

if(!passRegex.test(value)){
showError("password","≥8 ký tự, có chữ hoa, chữ thường và số")
return false
}

clearError("password")
return true

}


function validateConfirm(){

if(confirm.value!==password.value){
showError("confirm","Mật khẩu không khớp")
return false
}

clearError("confirm")
return true

}


function validateGender(){

let gender=document.querySelector('input[name="gender"]:checked')

if(!gender){
document.getElementById("gender-error").textContent="Chọn giới tính"
return false
}

document.getElementById("gender-error").textContent=""
return true

}


function validateTerms(){

if(!terms.checked){
document.getElementById("terms-error").textContent="Phải đồng ý điều khoản"
return false
}

document.getElementById("terms-error").textContent=""
return true

}


fullname.addEventListener("blur",validateFullname)
email.addEventListener("blur",validateEmail)
phone.addEventListener("blur",validatePhone)
password.addEventListener("blur",validatePassword)
confirm.addEventListener("blur",validateConfirm)


fullname.addEventListener("input",()=>clearError("fullname"))
email.addEventListener("input",()=>clearError("email"))
phone.addEventListener("input",()=>clearError("phone"))
password.addEventListener("input",()=>clearError("password"))
confirm.addEventListener("input",()=>clearError("confirm"))


form.addEventListener("submit",function(e){

e.preventDefault()

let valid=
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm() &
validateGender() &
validateTerms()

if(valid){

form.style.display="none"

successBox.innerHTML=`Đăng ký thành công! 🎉 <br> Xin chào ${fullname.value}`

}

})
