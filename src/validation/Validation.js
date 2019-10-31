
class Validation {

    static required = (value = null) => {
        if (!value) {
            return false;
        }
        if (value.length === 0) {
            return false;
        }
        if (value === '') {
            return false;
        }

        return true;
    }

    static requiredError = () => {
        return 'Requerido';
    }

    static stringMax = (value = '', max) => {
        if (!value) {
            return true;
        }

        if (value.length > max) {
            return false
        }
        return true;
    }

    static stringMaxError = (max) => {
        return `Longitud máxima es de ${max} caracteres`;
    }
    
    static stringMin = (value = '', min) => {
        if (!value) {
            return false;
        }
        
        if (value.length < min) {
            return false
        }
        return true;
    }

    static stringMinError = (min) => {
        return `Longitud mínima es de ${min} caracteres`;
    }
    
    static stringLengthBetween = (value = '', min, max) => {
        if (value.length < min || value.length > max) {
            return false;
        }
        return true;
    }

    static stringLengthBetWeenError = (min, max) => {
        return `La longitud del valor debe ser entre ${min} y ${max} caracteres`;
    }

    static isInteger = (value) => {
        return Number.isInteger(Number.parseInt(value, 10));
    }

    static isIntegerError = () => {
        return `Dato incorrecto`;
    }

    static IsNumeric = (value) => {
        return !isNaN(value);
    }

    static IsNumericError = () => {
        return `Dato incorrecto`;
    }

    static numericMax = (value = null, max) => {
        if (!value) {
            return false;
        }
        if (value > max) {
            return false
        }
        return true;
    }

    static numericMaxError = (max) => {
        return `Valor máximo es ${max}`;
    }
    
    static numericMin = (value = null, min) => {
        if (!value) {
            return false;
        }
        if (value < min) {
            return false
        }
        return true;
    }
    
    static numericMinError = (min) => {
        return `Valor mínimo es ${min}`;
    }

}

export default Validation;