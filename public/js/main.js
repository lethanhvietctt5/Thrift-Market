let menu = document.getElementsByClassName("menu")[0];
let submenu = document.getElementsByClassName("submenu")[0];
menu.onclick = function () {
  menu.innerHTML = "";
  if (menu.classList.contains("close")) {
    menu.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z" fill="currentColor"></path></svg>`;
    menu.classList.remove("close");
    menu.classList.add("open");
    submenu.classList.remove("hidden");
  } else {
    menu.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z" fill="currentColor"></path></svg>`;
    menu.classList.remove("open");
    menu.classList.add("close");
    submenu.classList.add("hidden");
  }
};
var socket = io();

$(document).ready(function () {
  let birth = $(".birth").text();
  let date = new Date(birth);
  $(".birth").text(date.toLocaleDateString());

  let id = $(".id_specific").text();
  let my_id = id;
  socket.emit("changeID", id);
  socket.on("recieve", ({ id, msg }) => {
    // console.log("myID:" + my_id + "," + "recieveID:" + id);
    if (id == my_id) {
      let content = `<div class="w-full my-2 flex justify-start">
      <div class="bg-gray-400 p-2 rounded-lg">${msg} </div>
    </div>`;
      $(".list_messages").append(content);
      let element = document.getElementsByClassName("list_messages")[0];
      element.scrollTop = element.scrollHeight;
    }
  });

  $(document).on("keypress", function (e) {
    if (e.which == 13 && !e.shiftKey) {
      //Nhấn phím Enter
      if ($("#input_msg").is(":focus")) {
        let sendID = $(".my_id").text();
        let recieveID = $("#current_user").text();
        let msg = $("#input_msg").val();
        if (msg.length > 0) {
          socket.emit("send", { id: recieveID, msg: msg });
          let content = `<div class="w-full my-2 flex justify-end">
          <div class="bg-green-600 p-2 rounded-lg">${msg} </div>
          </div>`;
          $(".list_messages").append(content);
          $("#input_msg").val("");
          let element = document.getElementsByClassName("list_messages")[0];
          element.scrollTop = element.scrollHeight;
        }
      }
    }
  });
});
