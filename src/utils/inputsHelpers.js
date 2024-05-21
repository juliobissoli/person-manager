/**
 * Filtra dígitos de uma string e retorna os primeiros `maxDigits` dígitos.
 * @param {number} maxDigits - Número máximo de dígitos a serem retornados.
 * @param {string} viewString - String de onde os dígitos serão extraídos.
 * @returns {string} String contendo apenas os primeiros `maxDigits` dígitos.
 */
export function filterDigits(maxDigits, viewString) {
    const regex = /\d+/g;
    const digitsArray = viewString.match(regex);
    if (!digitsArray) {
        return '';
    }
    const concat = digitsArray.join('')
    return concat.slice(0, maxDigits)
}

/**
 * Aplica máscara de CPF em uma string de dígitos.
 * @param {string} value - String contendo dígitos de um CPF.
 * @returns {string} CPF formatado.
 */
export function maskCpf(value) {
    let cpf = filterDigits(11, value)
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}

/**
 * Aplica máscara de CEP em uma string de dígitos.
 * @param {string} value - String contendo dígitos de um CEP.
 * @returns {string} CEP formatado.
 */
export function maskCep(value) {
    let cep = filterDigits(8, value);
    cep = cep.replace(/(\d{5})(\d{3})/, "$1-$2");
    return cep;
}

/**
 * Aplica máscara de telefone em uma string de dígitos.
 * @param {string} value - String contendo dígitos de um telefone.
 * @returns {string} Telefone formatado.
 */
export function maskPhone(value) {
    let data = filterDigits(11, value)
    if (data.length === 0) return ''
    let x = data.match(/(\d{2})(\d{4,5})(\d{4})/);
    if (x) {
        return `(${x[1]}) ${x[2]}-${x[3]}`
    }
    return data
}

/**
 * Valida se o email fornecido é válido.
 * @param {string} email - Email a ser validado.
 * @returns {boolean} Verdadeiro se o email é válido, falso caso contrário.
 */
export function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

/**
 * Valida se a senha fornecida é válida.
 * @param {string} password - Senha a ser validada.
 * @returns {boolean} Verdadeiro se a senha é válida, falso caso contrário.
 */
export function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return regex.test(password);
}

/**
 * Valida se o CPF fornecido é válido.
 * @param {string} value - CPF a ser validado.
 * @returns {boolean} Verdadeiro se o CPF é válido, falso caso contrário.
 */
export function validateCpf(value) {
    let cpf = filterDigits(11, value)
    return cpf.length === 11
}

/**
 * Valida se o telefone fornecido é válido.
 * @param {string} value - Telefone a ser validado.
 * @returns {boolean} Verdadeiro se o telefone é válido, falso caso contrário.
 */
export function validatePhone(value) {
    let phone = filterDigits(11, value)
    return phone.length > 10 && phone.length < 12
}

/**
 * Valida um valor com base na entidade especificada.
 * @param {string} value - Valor a ser validado.
 * @param {string} entity - Entidade base para a validação ('email', 'cpf', 'password', 'phone').
 * @returns {boolean} Verdadeiro se o valor é válido para a entidade especificada, falso caso contrário.
 */
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

