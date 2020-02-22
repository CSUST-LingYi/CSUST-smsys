$(function(){
$('.showFileName').hide();
$('#uploadBtn').hide();
$('#resetBtn').hide();
$("#upload").on("change", "input[type='file']", function() {
var filePath = $(this).val();

if(filePath) {
$(".fileerrorTip").html("").hide();
var arr = filePath.split('\\');
var fileName = arr[arr.length - 1];
$('.showFileName').show();

$('#resetBtn').show();
$('#uploadBtn').show();
$(".showFileName").html(fileName);
$('#upload').hide();

} 
else {
$(".showFileName").html("");
$(".fileerrorTip").html("您未上传文件，或者您上传文件类型有误！").show();
return false;
}

});
});