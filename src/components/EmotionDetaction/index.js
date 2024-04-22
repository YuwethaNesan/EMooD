import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchSongs } from '../../actions/songActions';
import EmotionDetection from "./EmotionScreen";

const mapStateToProps = (state) => {

  return {
    token: state.tokenReducer.token
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    searchSongs,
  }, dispatch);

};
export default connect(mapStateToProps, mapDispatchToProps)(EmotionDetection);
