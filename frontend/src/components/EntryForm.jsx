import PropTypes from 'prop-types';


const EntryForm = (props) => {
    return (
        <div className="form-container">
            <form onSubmit={props.submitHandle}>
                <label>
                    name:
                </label>
                <input value={props.newName} onChange={props.handleNewName} required />
                <label>
                    number:
                </label>
                <input value={props.newNumber} onChange={props.handleNewNumber} required />
                <br />

                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}
EntryForm.propTypes = {
    submitHandle: PropTypes.func.isRequired,
    handleNewNumber: PropTypes.func.isRequired,
    newName: PropTypes.string.isRequired,
    handleNewName: PropTypes.func.isRequired,
    newNumber: PropTypes.string.isRequired,

};
export default EntryForm;