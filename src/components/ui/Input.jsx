import './Input.css'; 

const Input = ({ label, type, value, onChange, placeholder = '', disabled = false }) => {
    return (
        <div className="form-group">
            <label className="input-label">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="input"
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    );
}


export default Input;
