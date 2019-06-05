import { connect } from 'react-redux';
import GameModal from './game_modal';

const mapStateToProps = (state, ownProps) => ({
  messageDisplay: ownProps.messageDisplay,
  changeMessageDisplay: ownProps.changeMessageDisplay
});

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(GameModal);
