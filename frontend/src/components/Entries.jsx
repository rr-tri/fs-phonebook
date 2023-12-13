import PropTypes from 'prop-types';


const Entries = (props) => {

    return (
        <div >
            <p>{props.person.name} {props.person.number} </p>
            <button onClick={() => props.onDelete(props.person)}>Delete</button>
        </div>

    )
}



Entries.propTypes = { 
    person: PropTypes.object.isRequired, 
    onDelete: PropTypes.func.isRequired, 
  };

export default Entries;