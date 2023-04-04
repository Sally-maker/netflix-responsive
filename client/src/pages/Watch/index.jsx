import { ArrowBackOutlined } from "@material-ui/icons";
import "./styles.scss";
import { Link } from "react-router-dom";
import movie from '../../Movies/ringloop.mov'

const Watch = () => {
    return (
        <div className='watch'>
        <Link to="/">
            <div className='back'>
            <ArrowBackOutlined />
            Home
            </div>
        </Link>
            <video 
                className='video'
                controls
                autoPlay
                onProgress={true}
                src={movie}
            /> 
    </div>
  );    
}
export default Watch
