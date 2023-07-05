const baseURL = "http://localhost:4000/users";

const btn = document.querySelector(".btn");
const msg = document.querySelector(".msg");
const itemList = document.querySelector(".items");

const del = document.querySelector(".delete");

const showUserOutput = (data) => {
  const name = data.name;
  const email = data.email;
  const phone = data.phone;
  const uid = data.id;
  // add the user details in the list.
  let newli = document.createElement("li");
  newli.className = "item";
  newli.id = uid;

  let namespan = document.createElement("span");
  let emailspan = document.createElement("span");
  let phonespan = document.createElement("span");
  namespan.className = "name";
  emailspan.className = "email";
  phonespan.className = "phone";
  namespan.appendChild(document.createTextNode(name));
  emailspan.appendChild(document.createTextNode(email));
  phonespan.appendChild(document.createTextNode(phone));
  newli.appendChild(namespan);
  newli.appendChild(emailspan);
  newli.appendChild(phonespan);

  // add delete button to the list
  let delbtn = document.createElement("button");
  delbtn.className = "delete";
  delbtn.appendChild(document.createTextNode("Delete"));

  newli.appendChild(delbtn);

  delbtn.addEventListener("click", removeUser);

  // add edit button to the list
  let editbtn = document.createElement("button");
  editbtn.className = "edit";
  editbtn.appendChild(document.createTextNode("Edit"));

  newli.appendChild(editbtn);

  editbtn.addEventListener("click", editUser);

  itemList.appendChild(newli);
};

const getUsers = async (event) => {
  itemList.replaceChildren();
  try {
    const res = await axios.get(baseURL);
    const userList = res.data;
    if (userList.length > 0) {
      userList.forEach((user) => {
        showUserOutput(user);
      });
    } else {
      itemList.innerHTML = "<h4>No users available</h4>";
    }
  } catch (err) {
    msg.innerText = `Something went wrong: ${err.message}`;
    msg.classList.add("error");
    setTimeout(() => {
      msg.remove("error");
    }, 3000);
  }
};
document.addEventListener("DOMContentLoaded", getUsers);

const submitHandler = async (event) => {
  event.preventDefault();
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const uid = document.querySelector(".btn").id;

  if (name.value === "" || email.value === "") {
    msg.innerText = "Please enter all the fields";
    msg.classList.add("error");

    setTimeout(() => {
      msg.remove("error");
    }, 3000);
  } else {
    let userDetails = {
      name: name.value,
      email: email.value,
      phone: phone.value,
    };
    if (uid !== "") {
      try {
        await axios.post(`${baseURL}/edit-user/${uid}`, userDetails);
        getUsers();
        msg.innerText = "Successfully updated the user.";
        msg.classList.add("success");
        setTimeout(() => {
          msg.remove("success");
        }, 3000);
        document.querySelector(".btn").value = "Submit";
        document.querySelector(".btn").id = "";
      } catch (err) {
        msg.innerText = `Something went wrong: ${err.message}`;
        msg.classList.add("error");
        setTimeout(() => {
          msg.remove("error");
        }, 3000);
      }
    } else {
      try {
        const res = await axios.post(`${baseURL}/add-user`, userDetails);
        showUserOutput(res.data);
        msg.innerText = "Successfully added the user.";
        msg.classList.add("success");
        setTimeout(() => {
          msg.remove("success");
        }, 3000);
      } catch (err) {
        msg.innerText = `Something went wrong: ${err.message}`;
        msg.classList.add("error");
        setTimeout(() => {
          msg.remove("error");
        }, 3000);
      }
    }
    // localStorage.setItem(email.value, JSON.stringify(userDetails));
    name.value = "";
    email.value = "";
    phone.value = "";
  }
};

const removeUser = async (e) => {
  const li = e.target.parentElement;
  const uid = li.id;
  try {
    await axios.delete(`${baseURL}/delete-user/${uid}`);
    itemList.removeChild(li);
    msg.innerText = "Successfully deleted the user.";
    msg.classList.add("success");
    setTimeout(() => {
      msg.remove("success");
    }, 3000);
  } catch (err) {
    msg.innerText = `Something went wrong: ${err.message}`;
    msg.classList.add("error");
    setTimeout(() => {
      msg.remove("error");
    }, 3000);
  }
  // localStorage.removeItem(email);
};

const editUser = (e) => {
  const li = e.target.parentElement;
  const name = li.querySelector(".name").textContent;
  const email = li.querySelector(".email").textContent;
  const phone = li.querySelector(".phone").textContent;
  const uid = li.id;
  document.querySelector(".btn").id = uid;
  document.querySelector(".btn").value = "Edit";
  // localStorage.removeItem(email);
  itemList.removeChild(li);
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
};
