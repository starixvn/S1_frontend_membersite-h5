$(function(){
    $('.switch').click(function() {
        $('.recent').toggleClass('open')
        $('.switch').removeClass('open')
        $(this).addClass('open')
        $('.channel').addClass('open')
        $('.icon-circle-right').toggleClass('open')
    })
    $('.openPopup').click(function() {
        $('.popUp').addClass('open')
    })
    $('.closePopup').click(function() {
        $('.popUp').removeClass('open')
    })
    $('.buttonBox > button').click(function() {
        $('.buttonBox > button').removeClass('open')
        $(this).addClass('open')
    })
    $('.checkbox > i').click(function() {
        $(this).toggleClass('open')        
    })
    $('.functionList ~ .account').click(function() {
        $('.functionList ~ .account .icon-circle-right').removeClass('open')
        $('.functionList ~ .account .content').removeClass('open')
        $(this).children().children('.icon-circle-right').toggleClass('open')
        $(this).children('.content').toggleClass('open')
    })
    $('.selectBank > button').click(function() {
        $('.selectBank > button').removeClass()
        $(this).addClass('open')
    })
});