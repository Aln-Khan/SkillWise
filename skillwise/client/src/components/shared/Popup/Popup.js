import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Popup.css'; 

const Popup = ({ show, handleModal, color = '#ffffff', children }) => {
  const textColor = color === '#f8d7da' ? '#721c24' : 'black';

  return (
    <Modal centered show={show} onHide={() => handleModal(false)} aria-labelledby="modal-title">
      <Modal.Body style={{ backgroundColor: color, color: textColor }}>
        {children}
      </Modal.Body>
    </Modal>
  );
};

Popup.propTypes = {
  show: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Popup.defaultProps = {
  color: '#ffffff', 
};

export default Popup;
