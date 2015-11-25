
// $("#image").change(function(){
//   console.log(this);
//   if (this.files && this.files[0]) {
//     var reader = new FileReader();
//     reader.onload = function (e) {
//       $('#preview').attr('src', e.target.result)
//         .Jcrop({
//           onSelect: updateCoords,
//           bgOpacity:   .4,
//           setSelect:   [ 100, 100, 50, 50 ],
//           aspectRatio: 1
//         });
//     }
//     reader.readAsDataURL(this.files[0]);
//   }
// });

// function updateCoords(c) {
//   console.log(c);
//   $('#left').val(c.x);
//   $('#right').val(c.x + c.w);
//   $('#top').val(c.y);
//   $('#bottom').val(c.y + c.h);
// };


(function($) {
  $.fn.serializefiles = function() {
      var obj = $(this);
      /* ADD FILE TO PARAM AJAX */
      var formData = new FormData();
      $.each($(obj).find("input[type='file']"), function(i, tag) {
          $.each($(tag)[0].files, function(i, file) {
              formData.append(tag.name, file);
          });
      });
      var params = $(obj).serializeArray();
      $.each(params, function (i, val) {
          formData.append(val.name, val.value);
      });
      return formData;
  };
})(jQuery);

$('#image').on('change', function() {
  var form = $('#form');

  var formData = form.serializefiles();

  $.ajax({
    url: 'upload',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data){
      $('#preview').attr('src', data);
    }
  });
});
