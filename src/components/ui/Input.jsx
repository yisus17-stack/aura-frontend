import './Input.css'; 

const Input = ({ label, type, value, onChange }) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="input"
            />
        </div>
    );
}


export default Input;