const form=document.getElementById("orderForm")

const product=document.getElementById("product")
const quantity=document.getElementById("quantity")
const date=document.getElementById("date")
const address=document.getElementById("address")
const note=document.getElementById("note")

const noteCount=document.getElementById("note-count")
const totalBox=document.getElementById("total")

const confirmBox=document.getElementById("confirmBox")
const success=document.getElementById("success")

const prices={
"Áo":150000,
"Quần":200000,
"Giày":500000
}

function showError(id,msg){
document.getElementById(id+"-error").textContent=msg
}

function clearError(id){
document.getElementById(id+"-error").textContent=""
}

function validateProduct(){

if(product.value===""){
showError("product","Chọn sản phẩm")
return false
}

clearError("product")
return true
}

function validateQuantity(){

let q=parseInt(quantity.value)

if(isNaN(q)||q<1||q>99){
showError("quantity","1 - 99")
return false
}

clearError("quantity")
return true
}

function validateDate(){

let d=new Date(date.value)
let today=new Date()

let max=new Date()
max.setDate(today.getDate()+30)

if(date.value===""){
showError("date","Chọn ngày giao")
return false
}

if(d<today){
showError("date","Không được chọn ngày quá khứ")
return false
}

if(d>max){
showError("date","Không quá 30 ngày")
return false
}

clearError("date")
return true
}

function validateAddress(){

let value=address.value.trim()

if(value.length<10){
showError("address","Ít nhất 10 ký tự")
return false
}

clearError("address")
return true
}

function validateNote(){

let len=note.value.length

noteCount.textContent=len+"/200"

if(len>200){
noteCount.style.color="red"
showError("note","Tối đa 200 ký tự")
return false
}

noteCount.style.color="gray"
clearError("note")
return true
}

function validatePay(){

let pay=document.querySelector('input[name="pay"]:checked')

if(!pay){
showError("pay","Chọn phương thức")
return false
}

clearError("pay")
return true
}

function updateTotal(){

let p=prices[product.value]||0
let q=quantity.value||0

let total=p*q

totalBox.textContent=Number(total).toLocaleString("vi-VN")
}

product.addEventListener("change",updateTotal)
quantity.addEventListener("input",updateTotal)

note.addEventListener("input",validateNote)

form.addEventListener("submit",function(e){

e.preventDefault()

let valid=
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePay()

if(!valid) return

let p=product.value
let q=quantity.value
let total=prices[p]*q

confirmBox.style.display="block"

confirmBox.innerHTML=`
<h3>Xác nhận đặt hàng</h3>
<p>Sản phẩm: ${p}</p>
<p>Số lượng: ${q}</p>
<p>Tổng tiền: ${Number(total).toLocaleString("vi-VN")} VNĐ</p>
<p>Ngày giao: ${date.value}</p>
<button id="ok">Xác nhận</button>
<button id="cancel">Hủy</button>
`

document.getElementById("ok").onclick=function(){

confirmBox.style.display="none"
form.style.display="none"

success.innerHTML="Đặt hàng thành công 🎉"

}

document.getElementById("cancel").onclick=function(){

confirmBox.style.display="none"

}

})
