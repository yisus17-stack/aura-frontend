import './Input.css'; 

const Input = ({ label, type, value, onChange, placeholder = '', disabled = false, error = '' }) => {
    return (
        <div className={`form-group ${error ? 'has-error' : ''}`}>
            <label className="input-label">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`input ${error ? 'input-error' : ''}`}
                placeholder={placeholder}
                disabled={disabled}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
}


export default Input;
