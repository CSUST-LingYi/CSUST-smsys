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
$(".fileerrorTip").html("��δ�ϴ��ļ����������ϴ��ļ���������").show();
return false;
}

});
});