import { connect } from 'react-redux';
// import 'dplayer/dist/DPlayer.min.css';
// import Dplayer from 'dplayer';
import Player from 'griffith'
import { withRouter } from 'next/router'
const video = ({ router }) => {

    const url = router.query.url

    const sources = {
        hd: {
          play_url: url,
        },
    }
    
    return (
        <Player sources={sources} />
    )
    
}

export default withRouter(video)