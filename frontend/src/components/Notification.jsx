
import PropTypes from 'prop-types';

const Notification = ({ message, emsg }) => {

    if (message === null && emsg === null) {
        return null
    }

    return (
        <div >
            {message !== null && <p className="notify message">
                {message}
            </p>}
            {emsg !== null && <p className="notify error">
                {emsg}
            </p>}

        </div>
    )

}
Notification.propTypes = {
    message: PropTypes.string, 
    emsg: PropTypes.string, 
  };
export default Notification;