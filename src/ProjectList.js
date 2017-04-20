/**
 * Created by xdj on 2017/4/20.
 */
import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import $ from 'jquery/dist/jquery.min';

const BASE_URL = "http://localhost:8080/JDoc/";

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',

    marginTop: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  gridList: {
    width: 2000,
    // height: 450,
    // overflowY: 'auto',
  },
};

class ProjectList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    $.get(
      BASE_URL + "project_list.do",
      {
        user_id: 1,
      },
      data => {
        this.setState({content: data});
      }
    )
  }

  render() {
    return <div style={styles.root}>
      <GridList
        cellHeight={180}
        cols={4}
        style={styles.gridList}>
        <Subheader>December</Subheader>
        {this.state.content.map((tile) => (
          <GridTile
            key={tile.id}
            title={tile.name}
            subtitle={<span>by <b>{tile.name}</b></span>}
            actionIcon={<IconButton><StarBorder color="white"/>
            </IconButton>}>
            <img src="images/test1.png"/>
          </GridTile>
        ))}
      </GridList>
    </div>;
  }
}

export default ProjectList;