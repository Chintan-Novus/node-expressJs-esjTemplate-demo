/**
 * Created by chintan on 6/19/17.
 */
var currentPage = 1;
var perPageRecord = 3;
var offset = 2;

$(document).ready(function () {
    $(document).click(function(e) {
        if ((e.target.id != 'obj2' && $(e.target).parents('#obj2').length == 0) && e.target.id != 'option-btn' && $(e.target).parents('#option-btn').length == 0) {
            $('#obj2').fadeOut().hide()
        }
    });

    $("#obj2-dropdown").change(function(event) {
        var quantity = $('#quantity').val();
        if(quantity === '') {
            $('.error').show()
            return false;
        } else {
            currentPage = 1;
            $('.error').hide()
            fillData();
        }
        event.stopPropagation();
    });
});

function clickOption() {
    $('#obj2').fadeIn().show()
}

function changeQuantity(quantity) {
    if(quantity === '') {
        $('.error').show()
        return false;
    } else {
        $('.error').hide()
        fillData();
    }
}

function fillData() {
    var quantity = $('#quantity').val();
    var option = $('#obj2-dropdown').val();

    var html = '<ul class="list-group obj3-data">';
    var obj2 = $('#obj2-dropdown').val();

    var isFirst = (currentPage === 1);
    var isLast = (currentPage === Math.ceil(quantity/perPageRecord));

    $('#previous').attr( "disabled", false );
    $('#next').attr( "disabled", false );

    if(isFirst) {
        $('#previous').attr( "disabled", true );
    }
    if(isLast) {
        $('#next').attr( "disabled", true );
    }

    var start = (isFirst) ? 1 : (currentPage * perPageRecord) - offset;
    var end = (currentPage * perPageRecord < quantity) ? (currentPage * perPageRecord) : quantity;

    for (var i = start; i <= end; i++) {
        html += '<li class="list-group-item">';
        html += '<div class="item">';
        html += '<span class="badge">'+i+'</span>';
        html += '<div class="item-text">Item '+option + i +'</div>';
        html += '</div>';
        html += '</li>';
    }
    html += '</ul>';

    $('#obj3').show();
    $('#obj3-data').html(html)
}

function changePage(incrementPage) {
    if(incrementPage) {
        currentPage += 1;
    } else {
        currentPage -= 1;
    }
    fillData();
}