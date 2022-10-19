let cl = console.log;

const stdForm = document.getElementById("stdForm");
const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const emailControl = document.getElementById("email");
const contactControl = document.getElementById("contact");
const submitBtnControl = document.getElementById("submitBtn");
const updateBtnControl = document.getElementById("updateBtn");
const info = document.getElementById("info");

let stdArray = [];

function uuid(mask = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") {
  return `${mask}`.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const onStdEdit = (e) => {
  let getEditId = e.closest("tr").getAttribute("id");
  let obj = stdArray.find((ele) => ele.id === getEditId);
  // cl(obj)
  localStorage.setItem("getEditId", getEditId);

  fnameControl.value = obj.fname;
  lnameControl.value = obj.lname;
  emailControl.value = obj.email;
  contactControl.value = obj.contact;
  updateBtnControl.classList.remove("d-none");
  submitBtnControl.classList.add("d-none");
};

const onStdUpdate = (e) => {
  let getEditId = localStorage.getItem("getEditId");
  cl(getEditId);

  stdArray.forEach((ele) => {
    if(ele.id === getEditId){
      ele.fname = fnameControl.value;
      ele.lname = lnameControl.value;
      ele.email = emailControl.value;
      ele.contact = contactControl.value;
    }
  })
  localStorage.setItem('stdArray', JSON.stringify(stdArray))
  localStorage.removeItem("getEditId");
  let tr = document.getElementById(getEditId);
  let srNub = tr.firstElementChild.innerHTML;
  cl(srNub);
  cl(tr);
  tr.innerHTML = `
            <td>${srNub}</td>
            <td>${fnameControl.value}</td>
            <td>${lnameControl.value}</td>
            <td>${emailControl.value}</td>
            <td>${contactControl.value}</td>
            <td>
            <button class="btn btn-info" onclick="onStdEdit(this)">Edit</button>
            </td>
            <td>
            <button class="btn btn-danger" onclick="onStdDelete(this)">Delete</button>
            </td>
  `;
};

const onStdSubmit = (e) => {
  e.preventDefault();
  // cl(e)
  let obj = {
    fname: fnameControl.value,
    lname: lnameControl.value,
    email: emailControl.value,
    contact: contactControl.value,
    id: uuid(),
  };
  stdArray.push(obj);
  localStorage.setItem("stdArray", JSON.stringify(stdArray));
  let tr = document.createElement("tr");
  tr.id = obj.id;
  tr.innerHTML = `
    <td>${stdArray.length}</td>
    <td>${obj.fname}</td>
    <td>${obj.lname}</td>
    <td>${obj.email}</td>
    <td>${obj.contact}</td>
    <td>
    <button class="btn btn-info" onclick="onStdEdit(this)">Edit</button>
    </td>
    <td>
    <button class="btn btn-danger" onclick="onStdDelete(this)">Delete</button>
    </td>
`;
  //   info.innerHTML = tr;
  info.append(tr);
  e.target.reset();
};

function templeting(arr) {
  let result = "";
  arr.forEach((std, i) => {
    result += `
                <tr id="${std.id}" >
                    <td>${i + 1}</td>
                    <td>${std.fname}</td>
                    <td>${std.lname}</td>
                    <td>${std.email}</td>
                    <td>${std.contact}</td>
                    <td>
                       <button class="btn btn-info"onclick="onStdEdit(this)">Edit</button>
                    </td>
                    <td>
                       <button class="btn btn-danger"  onclick="onStdDelete(this)">Delete</button>
                    </td>
                </tr>
        `;
  });
  info.innerHTML = result;
}

if (localStorage.getItem("stdArray")) {
  stdArray = JSON.parse(localStorage.getItem("stdArray"));
  templeting(stdArray);
}

stdForm.addEventListener("submit", onStdSubmit);
updateBtnControl.addEventListener("click", onStdUpdate);
