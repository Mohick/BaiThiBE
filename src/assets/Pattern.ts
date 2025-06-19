const RegexUserName =  /^[a-zA-Z0-9]{2,30}$/
const RegexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const RegexPassword = /^(?=(.*\d){8,})/

export {
    RegexUserName,
    RegexEmail,
    RegexPassword
}
