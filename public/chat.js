(function (window, document, undefined) {

    window.addEventListener('load', function () {

        var messages = []
        var socket = io.connect('http://localhost:3700')
        var field = document.getElementById('field')
        var sendBtn = document.getElementById('send')
        var content = document.getElementById('content')
        var name = document.getElementById('name')

        function displayMessage(data) {
            if (data.message) {
                messages.push(data)
                var html = ''
                messages.forEach(function (entry) {
                    html += '<b>' + (entry.username ? entry.username : 'Server') + ': </b>'
                    html += entry.message + '<br/>'
                })
                content.innerHTML = html
                content.scrollTop = content.scrollHeight
            } else {
                console.log('There is a problem', data)
            }
        }

        function sendMessage() {
            if (name.value === '') {
                alert('Please type your name.')
            } else {
                var text = field.value
                socket.emit('send', { message: text, username: name.value })
                field.value = ''
            }
        }

        // bind to the socket
        socket.on('message', displayMessage)

        // button click
        sendBtn.addEventListener('click', sendMessage)

        // enter key
        field.addEventListener('keyup', function (e) {
            e.keyCode == 13 && sendMessage()
        })

    })

}(window, document))
