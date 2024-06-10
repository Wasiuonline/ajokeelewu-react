$(document).ready(function () {
							
$(".general-fade").hide();

$("input").focus(function(){
$(".success").hide("fold");
});

///////////////////////////////////////////////

$("input:checkbox:not(.sel-group)").change(function () {
var checked_class = $(this).attr("class");
var  det_unchecked = $("input:checkbox."+checked_class+":not(:checked)").length;
var  det_unchecked_all = $("input:checkbox:not(:checked)").length;

if(det_unchecked > 0){
$("input:checkbox#"+checked_class).prop("checked", false);
}else if(det_unchecked == 0 && det_unchecked_all == 1){
$("input:checkbox#"+checked_class).prop("checked", true);
}else{
$("input:checkbox#"+checked_class).prop("checked", true);
}
});

$("input.sel-group").change(function(){
var group_id = $(this).attr("id");
$("input:checkbox."+group_id).prop("checked", $(this).prop("checked"));
var  det_unchecked_all = $("input:checkbox:not(:checked)").length;
});

///////////////////////////////////////////////
$(".del-btn").click(function(){
var  det_checked_all = $("input:checkbox:not(.sel-group):checked").length;
if(det_checked_all > 0){
swal({
  title: "Confirmation",
  text: "Are you sure you want to " + det_action_title + " " + det_checked_all + " " + conf_text + "(s)?",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes",
  closeOnConfirm: true
},
function(isConfirm){
  if (isConfirm) {
$(".sub-del").click();
  } else {
return false;
  }
});
}else{
sweetAlert("Notice", "Atleast one " + conf_text + " must be selected.", "error");
}
});


});