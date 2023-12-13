import PropTypes from 'prop-types';


const Filter = (props) => {
    return (
        <div>
            <label >filter shown with </label>
            <input value={props.searchQuery} onChange={props.searchHandle} />
        </div>
    )
};

Filter.propTypes = {
    searchQuery: PropTypes.string.isRequired, 
    searchHandle: PropTypes.func.isRequired, 

  };

export default Filter;