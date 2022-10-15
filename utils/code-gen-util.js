const characters = 'QWE0RTY1UIO2PAS3DFG4HJK5LZX6CVB7NMq8wer9tyu0iop1asd2fgh3jkl4zxc5vbn6m'

function generateCode(size = 6) {
    let code = '';

    for (let i = 0; i < size; i++) {
        const randomNumber = Math.floor(Math.random() * characters.length)
        code += characters.charAt(randomNumber)
    }

    return code;
}

module.exports = {
    generateCode
}
