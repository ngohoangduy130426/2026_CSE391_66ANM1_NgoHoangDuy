const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const stat = document.getElementById("stat");

let students = [];

function getRank(score){
    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";
}

function renderTable(){

    tableBody.innerHTML = "";

    students.forEach((sv,index)=>{

        let rank = getRank(sv.score);

        let tr = document.createElement("tr");

        if(sv.score < 5){
            tr.classList.add("low-score");
        }

        tr.innerHTML = `
            <td>${index+1}</td>
            <td>${sv.name}</td>
            <td>${sv.score}</td>
            <td>${rank}</td>
            <td>
                <button data-index="${index}" class="delete-btn">Xóa</button>
            </td>
        `;

        tableBody.appendChild(tr);
    });

    updateStat();
}

function updateStat(){

    let total = students.length;

    let avg = 0;

    if(total > 0){
        let sum = students.reduce((s,sv)=> s + sv.score ,0);
        avg = (sum/total).toFixed(2);
    }

    stat.innerText = `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`;
}

function addStudent(){

    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);

    if(name === "" || isNaN(score) || score < 0 || score > 10){
        alert("Vui lòng nhập đúng dữ liệu");
        return;
    }

    students.push({
        name: name,
        score: score
    });

    renderTable();

    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
}

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addStudent();
    }
});

tableBody.addEventListener("click", function(e){

    if(e.target.classList.contains("delete-btn")){

        let index = e.target.dataset.index;

        students.splice(index,1);

        renderTable();
    }
});
