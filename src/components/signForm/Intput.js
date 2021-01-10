function Input ({name, onChange = (e) => console.log(e.target.value), type='text'}) {
  return (
    <div className="form__inputContainer">
      <label className="form__label" htmlFor={name}>{name}</label>
      <input type={type} onChange={onChange} name={name} className="form__input"/>
    </div>
  )
}
export default  Input