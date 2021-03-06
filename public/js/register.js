$(document).ready(function () {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-bottom-center",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "2000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  $(".register").submit(function () {
    if ($("#name").val().length == 0) {
      toastr.error("Bạn chưa nhập Họ tên người dùng ...");
      return false;
    } else if (!regex.test($("#email").val().toLowerCase())) {
      toastr.error("Email không hợp lệ ...");
      return false;
    } else if ($("#birth").val().length == 0) {
      toastr.error("Bạn chưa nhập Ngày sinh ...");
      return false;
    } else if ($("#phone").val().length == 0) {
      toastr.error("Bạn chưa nhập Số ĐT ...");
      return false;
    } else if (!$("input:radio[name='gender']").is(":checked")) {
      toastr.error("Bạn chưa chọn Giới tính ...");
      return false;
    } else if ($("#password").val().length < 8) {
      toastr.error("Mật khẩu ít nhất 8 ký tự ...");
      return false;
    } else if ($("#password2").val() !== $("#password").val()) {
      toastr.error("Mật khẩu nhập lại không trùng khớp ...");
      return false;
    } else return true;
  });
});
