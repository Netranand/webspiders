import { connect } from 'react-redux';
import UserNavbar from '../components/UserNavbar';
import { logoutUser } from '../actions/authActions';

const mapStateToProps = state => ({
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserNavbar);
