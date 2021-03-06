const gotoContact = function(){
    $("html, body").animate({ scrollTop: $("footer .footer-content-right").offset().top }, 1000);
    return false;
};

const cleanFields = function(){
    $(".footer-content-right input, .footer-content-right textarea").val("");
};

const showSuccess = function(){
    $(".alert.alert-success").show();
};

const isTxtEmpty = x => x.trim().length === 0;

const showAlert = function(txt){
    $(".alert.alert-danger>span").text(txt);
    $(".alert.alert-danger").show();
};

const validateFields = function(){
    if(isTxtEmpty($(".footer-content-right input#name").val())){
        showAlert("Te falta el nombre.");
        return false;
    }
    if(isTxtEmpty($(".footer-content-right input#email").val())){
        showAlert("Ingresa un correo.");
        return false;
    }
    if(isTxtEmpty($(".footer-content-right textarea#comment").val())){
        showAlert("Ingresa un comentario.");
        return false;
    }
    return true;
};

const afterSend = function(){
    showSuccess();
    cleanFields();
};

const loadingBtn = function($btn){
    $btn.addClass("disabled");
    $btn.css("cursor", "not-allowed");
    $btn.text("Enviando mensaje...");
};

const resetBtn = function($btn){
    $btn.removeClass("disabled");
    $btn.css("cursor", "pointer");
    $btn.text("Enviar mensaje");
};

const sendMail = function(e){
    e.preventDefault();
    if(validateFields()){
        $('.alert.alert-dismissible').hide();
        let $btn = $(this);
        loadingBtn($btn);
        let jData = {
            name: $(".footer-content-right input#name").val(),
            email: $(".footer-content-right input#email").val(),
            phone: $(".footer-content-right input#phone").val(),
            comment: $(".footer-content-right textarea#comment").val()
        };
        fetch('/send', {
            method: 'POST',
            body: JSON.stringify(jData),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              resetBtn($btn);
              console.log("1", data);
              if(data.status < 1){
                showAlert("No se pudo enviar, intentalo de nuevo");
              }else{
                afterSend();
              }
            })
            .catch(err => {
                resetBtn($btn);
                showAlert("No se pudo enviar, intentalo de nuevo");
            });
    }
};

const addMail = function(e){
    e.preventDefault();
    if(validateFields()){
        $('.alert.alert-dismissible').hide();
        let $btn = $(this);
        loadingBtn($btn);
        let jData = {
            name: $(".footer-content-right input#name").val(),
            email: $(".footer-content-right input#email").val(),
            phone: $(".footer-content-right input#phone").val(),
            comment: $(".footer-content-right textarea#comment").val(),
            dreceived: new Date(Date.now()).toLocaleString()
        };
        fetch('/addMail', {
            method: 'POST',
            body: JSON.stringify(jData),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              resetBtn($btn);
              console.log("1", data);
              if(data.status < 1){
                showAlert("No se pudo enviar, intentalo de nuevo");
              }else{
                afterSend();
              }
            })
            .catch(err => {
                resetBtn($btn);
                showAlert("No se pudo enviar, intentalo de nuevo");
            });

    }
};

function add_chatinline(){
	var hccid=96485090;
	var nt=document.createElement("script");
	nt.async=true;nt.src="https://mylivechat.com/chatinline.aspx?hccid="+hccid;
	var ct=document.getElementsByTagName("script")[0];
	ct.parentNode.insertBefore(nt,ct);
}

function processMail(id){
  fetch('/processMail', {
    method: 'POST',
    body: JSON.stringify({
      id,
      dprocessed: new Date(Date.now()).toLocaleString()
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      location.reload(true);
    })
    .catch(err => {
        showAlert("No se pudo procesar");
    });
}

$(function(){
    //add_chatinline();
    $("#navContact,a.btn.btn-success,a.btn.btn-outline-success").on("click", gotoContact);
    $("#btnSendMail").on("click", addMail);
});