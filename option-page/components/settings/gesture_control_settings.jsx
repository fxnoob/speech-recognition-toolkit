import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import NavigationIcon from '@material-ui/icons/Navigation';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import objectDetectionHandFist from "../../../src/libs/ml/object_detection/objectdetect.handfist";

const styles = theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
        maxWidth: 700,
        backgroundColor: theme.palette.background.paper,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

class Home extends React.Component {
    state = {
        open: true,
        isSnackBarOpen: false,
    };
    constructor(props) {
        super(props);
        this.fist_pos_old = null;
        this.gestureRecognition = this.gestureRecognition.bind(this);
        this.HandleSnackBar = this.HandleSnackBar.bind(this);
    }
    componentDidMount() {
    }
    playVideo() {
        const hdConstraints = {
            video: {width: {min: 480}, height: {min: 480}}
        };
        navigator.mediaDevices.getUserMedia(hdConstraints)
            .then((stream) => {
                const video = document.createElement('video');
                const canvas = document.getElementById("videoCanvas");
                const context = canvas.getContext('2d');
                console.log(stream);
                video.srcObject = stream;
                this.play(video , canvas ,  context );
            });
    }
    play(video , canvas , context , detector) {
        setTimeout(() => {
            if(this.state.isSnackBarOpen)
                this.play(video , canvas , context , detector);
        } , 2);
        let fist_pos_old = this.fist_pos_old;
        if (video.paused) video.play();
        if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0) {
            /* Prepare the detector once the video dimensions are known: */
            if (!detector) {
                var width = ~~(80 * video.videoWidth / video.videoHeight);
                var height = 80;
                const  objectDetectionHandFistController = new objectDetectionHandFist();
                detector =  objectDetectionHandFistController.detect(width, height, 1.1);
            }
            /* Draw video overlay: */
            canvas.width = ~~(100 * video.videoWidth / video.videoHeight);
            canvas.height = 100;
            context.drawImage(video, 0, 0, canvas.clientWidth, canvas.clientHeight);
            var coords = detector.detect(video, 1);
            console.log("coords: " , coords);
            if (coords[0]) {
                var coord = coords[0];
                /* Rescale coordinates from detector to video coordinate space: */
                coord[0] *= video.videoWidth / detector.canvas.width;
                coord[1] *= video.videoHeight / detector.canvas.height;
                coord[2] *= video.videoWidth / detector.canvas.width;
                coord[3] *= video.videoHeight / detector.canvas.height;
                /* Find coordinates with maximum confidence: */
                var coord = coords[0];
                for (var i = coords.length - 1; i >= 0; --i)
                    if (coords[i][4] > coord[4]) coord = coords[i];
                /* Scroll window: */
                var fist_pos = [coord[0] + coord[2] / 2, coord[1] + coord[3] / 2];
                if (fist_pos_old) {
                    var dx = (fist_pos[0] - fist_pos_old[0]) / video.videoWidth,
                        dy = (fist_pos[1] - fist_pos_old[1]) / video.videoHeight;
                        /** send message to active tab with dx and dy */
                        window.scrollBy(dx * 200, dy * 200);
                } else
                    this.fist_pos_old = fist_pos;
                /* Draw coordinates on video overlay: */
                context.beginPath();
                context.lineWidth = '2';
                context.fillStyle = 'rgba(0, 255, 255, 0.5)';
                context.fillRect(
                    coord[0] / video.videoWidth * canvas.clientWidth,
                    coord[1] / video.videoHeight * canvas.clientHeight,
                    coord[2] / video.videoWidth * canvas.clientWidth,
                    coord[3] / video.videoHeight * canvas.clientHeight);
                context.stroke();
            }
            else
                this.fist_pos_old = null;
        }
        /** send data to content script with current canvas page */

    }

    HandleSnackBar(close) {
        this.setState({isSnackBarOpen: false});
        /** close video stream also*/

    }
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };
    gestureRecognition() {
        this.setState({isSnackBarOpen: true});
        this.playVideo();
    }
    render() {
        const { classes } = this.props;
        return (
                <React.Fragment>
                <Grid item xs={6}>
                        <List
                            component="nav"
                            subheader={<ListSubheader component="div">Gesture Control settings</ListSubheader>}
                            className={classes.root}
                        >
                            <ListItem button onClick={this.handleClick}>
                                <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="Gesture Control Settings" />
                                {this.state.open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested}>
                                        <Fab variant="extended" onClick={() => this.gestureRecognition()}>
                                            <NavigationIcon className={classes.extendedIcon} />
                                            Start Gesture Recognition
                                        </Fab>
                                    </ListItem>
                                </List>
                            </Collapse>
                        </List>
                    </Grid>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={this.state.isSnackBarOpen}
                        onClose={() => this.handleSnackBar('close')}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardContent>
                                        <canvas id="videoCanvas" className="VideoPanel" width={256} height={100} >
                                        </canvas>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={()=>this.HandleSnackBar('close')}>
                                        Close
                                    </Button>
                                </CardActions>
                            </Card>
                        }
                    />
                </React.Fragment>
        );
    }
}
export default withStyles(styles)(Home);
