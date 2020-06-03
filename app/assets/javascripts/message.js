$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message-box" data-message-id=${message.id}>
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
      `<div class="message-box" data-message-id=${message.id}>
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
      $('form')[0].reset();
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      $('.new-message__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.new-message__submit-btn').prop('disabled', false);
  });
 })

 var reloadMessages = function() {
    
  var last_message_id = $('.message-box:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.chat-main__messages').append(insertHTML);
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
    }
  })
  .fail(function() {
    alert('error');
  });
 };
 if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
 }
});