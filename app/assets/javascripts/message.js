$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message-box">
         <div class="message-box__info">
           <div class="message-box__info__name">
             ${message.user_name}
           </div>
           <div class="message-box__info__date">
             ${message.created_at}
           </div>
         </div>
         <p class="message-box__text">
          ${message.body}
         </p> 
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message-box">
         <div class="message-box__info">
           <div class="message-box__info__name">
             ${message.user_name}
           </div>
           <div class="message-box__info__date">
             ${message.created_at}
           </div>
         </div>
        <p class="message-box__text">
          ${message.body}
        </p>  
       </div>`
     return html;
   };
  }

  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__messages').append(html);
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.new-message__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  })
 })
});