$(document).ready(function () {
    $('#quantity').blur(function (e) {
        e.preventDefault();
        if (($('#quantity').val() == '')) {
            $('#quantity').val(0);
        }
    });
    var quantity = 0;
    $('.quantity-right-plus').off().click(function (e) {
        console.log("sss", $('#quantity').val());

        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        if (($('#quantity').val() === null)) {
            $('#quantity').val(0);
        }
        var quantity = parseInt($('#quantity').val());
        console.log(quantity);
        // If is not undefined

        $('#quantity').val(quantity + 1);


        // Increment

    });

    $('.quantity-left-minus').off().click(function (e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity').val());

        // If is not undefined

        // Increment
        if (quantity > 0) {
            $('#quantity').val(quantity - 1);
        }
    });

    $('#quantity').keypress(function (e) {
        var regex = new RegExp("^[0-9]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        e.preventDefault();
        return false;
    });
});
