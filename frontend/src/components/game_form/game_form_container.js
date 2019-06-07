import { connect } from 'react-redux';
import GameForm from './game_form';
import { createGame } from '../../actions/game_actions';

const mapStateToProps = state => {
    return {
        currentUser: state.session.user 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createGame: (name, image) => dispatch(createGame(name, image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameForm);