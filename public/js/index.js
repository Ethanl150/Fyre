$(function () {
    $(".delete").on("click", function (event) {
        console.log("clicked")
        let id = parseInt($(this).attr("data-id"))

        $.ajax('/api/delete/' + id, {
            type: 'DELETE'
        }).then(function () {
            console.log("deleted");
            location.reload();
        })
    })
})