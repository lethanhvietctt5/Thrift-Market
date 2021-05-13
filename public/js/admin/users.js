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
