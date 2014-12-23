$(document).ready(function() {
  $('.form-signin').validate({
      rules: {
        
         lastname: {
           required: true
         },
         email: {
           required: true,
           email : true
         },
         password: {
           required: true,
           minlength: 2
         },
         confirmation: {
           minlength: 2,
           equalTo: '#password'
         }
      },
      success: function(element) {
        element
        .text('OK!').addClass('valid')
      },
      messages: {

      }
  });
});
