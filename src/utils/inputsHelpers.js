

export function filterDigits(maxDigits, viewString) {
    const regex = /\d+/g;

    const digitsArray = viewString.match(regex);

    if (!digitsArray) {
        return '';
    }

    const concat = digitsArray.join('')

    return concat.slice(0, maxDigits)
}


export function maskCpf(value) {
    let cpf = filterDigits(11, value)
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}

export function maskCep(value) {
    let cep = filterDigits(8, value);
    cep = cep.replace(/(\d{5})(\d{3})/, "$1-$2");
    return cep;
}


export function maskPhone(value) {
    let data = filterDigits(11, value)

    if (data.length === 0) return ''

    let x = data.match(/(\d{2})(\d{4,5})(\d{4})/);
    if (x) {
        return `(${x[1]}) ${x[2]}-${x[3]}`
    }
    return data
}


export function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

export function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return regex.test(password);
}

export function  validateCpf(value) {
    let cpf = filterDigits(11, value)
    return cpf.length === 11
}

export function validatePhone(value) {
    let phone = filterDigits(11, value)
    return phone.length > 10 && phone.length < 12
}

export function validateByEntity(value, entity) {
    if (value.length === 0) return false
    if (entity === "email" && !validateEmail(value)) {
        return false
    }
    if (entity === "cpf" && !validateCpf(value)) {
        return false
    }
    if (entity === "password" && !validatePassword(value)) {
        return false
    }
    if (entity === "phone" && !validatePhone(value)) {
        return false
    }

    return true
}



