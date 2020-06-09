$(function(){
    $('.switch').click(function() {
        $('.recent').toggleClass('open')
        $('.transactionHistory').toggleClass('open')
        $('.switch').removeClass('open')
        $(this).addClass('open')
        $('.channel').addClass('open')
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
});