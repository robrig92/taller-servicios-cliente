import React from 'react';

const CustomLabel = ({label, isRequired}) => {
    return (
        <label>{label}{isRequired && <span className="required"><b>*</b></span>}</label>
    )
}

/**
 * Render de campos text, number, e-mail y select hasta el momento.
 * IMPORTANTE: No se ha probado con checkbox.
 * 
 */
const RenderField = ({
    input,
    label,
    type,
    optionItems,
    isRequired,
    isDisabled,
    meta: { touched, error, warning }
}) => {
    if (type === 'select') {
        return (
            <div>
                <CustomLabel label={label} isRequired={isRequired}/>
                <select 
                    {...input}
                    className="form-control"
                    disabled={isDisabled ? true : false}
                    >
                    <option key="-1" value="">Seleccione...</option>
                    {optionItems}
                </select>
                {touched &&
                    ((error && <span className="form-field-error">{error}</span>) 
                        || (warning && <span>{warning}</span>))}
            </div>
        );
    }

    if (type === 'textarea') {
        return (
            <div>
                <CustomLabel label={label} isRequired={isRequired}/>
                <textarea 
                    className="form-control"
                    {...input}
                    rows="4" 
                    cols="50"
                    placeholder={label} 
                    disabled={isDisabled ? true : false} >
                </textarea>
                {touched &&
                    ((error && <span className="form-field-error">{error}</span>) 
                        || (warning && <span>{warning}</span>))}
            </div>
        );
    }

    return (
        <div>
            <CustomLabel label={label} isRequired={isRequired}/>
            <input 
                className="form-control" 
                {...input} 
                placeholder={label} 
                type={type}
                disabled={isDisabled ? true : false} />
            {touched &&
                ((error && <span className="form-field-error">{error}</span>) 
                    || (warning && <span>{warning}</span>))}
        </div>
    )
}

export default RenderField;