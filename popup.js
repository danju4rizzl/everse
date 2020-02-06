const handleMsg = () => {
    $("#name").keyup(function () {
        let username = $("#name").val()
        const greetStr = `Hello ${username}`
        $("#greet").text(greetStr);
    });
};

(() => {
    handleMsg();
})();