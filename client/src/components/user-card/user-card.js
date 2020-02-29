import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const UserCard = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let firstDay = new Date(Date.parse(props.start_date)).toDateString();
    let lastDay = new Date(Date.parse(props.end_date)).toDateString();
    let nights = ((new Date(Date.parse(props.end_date)))-(new Date(Date.parse(props.start_date))))/(1000*60*60*24);

    const styleFollow = props.isFollowed ? {color: "red"} : {color: "grey"}

    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.root}>
        <CardHeader
            title={props.destination}
            subheader={firstDay}
        />
        <CardMedia
            className={classes.media}
            image={props.img}
            title={props.destination}
        />
        <CardContent>
            <Typography variant="body2" color="primary" component="p">
            ${props.price}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton onClick={props.actionWithFavorites} aria-label="add to favorites"  style={styleFollow}>
            <FavoriteIcon/>
            </IconButton>
            <IconButton
            className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            <Typography paragraph>The Deal: {props.description}</Typography>
            <Typography paragraph>
                When You Can Go
            </Typography>
            <Typography paragraph>
                {firstDay} - {lastDay}
            </Typography>
            <Typography paragraph>
                Escape the crowds and enjoy mild temperatures on a {nights}-night trip to {props.destination} for just ${props.price} per person.
            </Typography>
            <Typography paragraph>
              Guided touring in {props.destination}, plus plenty of time to explore the three cities on your own; the city centers are easily accessible from the hotels by either public transport or on foot.
            </Typography>
            <Typography>
              Transportation by bus between each city and an English-speaking guide throughout the trip.
            </Typography>
            </CardContent>
        </Collapse>
        </Card>
      </Grid>
    );
}

export default UserCard;
