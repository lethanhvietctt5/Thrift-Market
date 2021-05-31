$("table#users_table").Grid({
  search: true,
  pagination: true,
  sort: true,
  columns: ["Name", "Age", "Email"],
});
$(".gridjs-container")
  .parent()
  .addClass("w-full flex justify-center items-center");

$("table tr td:nth-child(3) span").addClass("flex justify-center items-center");

$(document).ready(function () {
  $(".btn_delete").click(function () {
    Swal.fire({
      title: "Chắc chắn?",
      text: "Bạn có chắc muốn xóa bài này ra khỏi hệ thống!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location = `/admin/posts/delete/${$(this).attr("id")}`;
      }
    });
  });
});
