function addLoading() {
  let content = `<div class="w-full h-full flex justify-center items-center">
    <div class="text-green-600">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="animate-spin iconify iconify--codicon" width="50" height="50" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"></path></g></svg>
    </div>
  </div>`;

  let element = document.getElementsByClassName("message")[0];
  element.innerHTML = "";
  element.innerHTML = content;
}

function getMessage(id) {
  addLoading();
  $.get({
    url: `/message/${id}`,
    success: function (data) {
      let content = "";
      for (let i = 0; i < data.result.length; i++) {
        if (data.result[i].isSend) {
          content += `<div class="w-full my-2 flex justify-end">
            <div class="bg-green-600 p-2 rounded-lg">${data.result[i].content} </div>
          </div>`;
        } else {
          content += `<div class="w-full my-2 flex justify-start">
            <div class="bg-gray-400 p-2 rounded-lg">${data.result[i].content} </div>
          </div>`;
        }
      }
      content =
        `<div class="list_messages w-full h-full p-4 overflow-y-scroll no-scrollbar">` +
        content +
        `</div>`;
      let element = document.getElementsByClassName("message")[0];
      element.innerHTML = "";
      element.innerHTML = content;
      element = document.getElementsByClassName("list_messages")[0];
      element.scrollTop = element.scrollHeight;
    },
  });
}

$(document).ready(function () {
  let slectedUser = $("#current_user").text();
  getMessage(slectedUser);
  $(".contact_item").removeClass("bg-gray-200");
  $("#" + slectedUser).addClass("bg-gray-200");
  let list_contact = $("#list_temp").children();
  let string_lc = "";
  for (let i = 0; i < list_contact.length; i++) {
    string_lc += "," + list_contact[i].innerHTML;
  }
  let arr = string_lc.split(",");
  console.log(arr);
  for (let i = 1; i < arr.length; i++) {
    $("#" + arr[i]).click(function () {
      $(".contact_item").removeClass("bg-gray-200");
      $(this).addClass("bg-gray-200");
      let name = $(this).children()[1].innerHTML;
      $(".select_chat").text(name);
      $("#current_user").text(arr[i]);
      let slectedUser = $("#current_user").text();
      getMessage(slectedUser);
    });
  }
});
